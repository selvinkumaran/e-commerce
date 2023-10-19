import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }
  saveProducts(products: Product[]) {
    this.storageService.saveProducts(products);
  }
  getLocalProducts(): Product[] {
    return this.storageService.getCachedProducts();
  }
  getCachedProducts(): Observable<Product[]> {
    let cachedProducts: Product[] = this.storageService.getCachedProducts();

    return new Observable((observer) => {
      if (cachedProducts.length > 0) {
        cachedProducts = this.storageService.getCachedProducts();
        observer.next(this.storageService.getCachedProducts());
      }
      this.getAllProducts().subscribe({
        next: (products: Product[]) => {
          let changed: boolean =
            cachedProducts.length !== products.length &&
            !cachedProducts.every(
              (p: Product, i: number) =>
                p.id === products[i].id && p.price === products[i].price
            );
          if (!changed) {
            observer.next(products);
            this.storageService.setProducts(products);
          }
        },
        complete: () => {
          observer.complete();
        },
        error: (error: Error) => {
          observer.error(error);
        },
      });
    });
  }
}
