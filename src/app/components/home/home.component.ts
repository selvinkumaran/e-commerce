import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data: Product[]) => {
        this.productService.saveProducts(data);
        this.products = data;
      },
      complete: () => {
        console.log('completed');
      },
      error: (error: Error) => {
        console.log('message', error.message);
        console.log('error', error.name);
      },
    });
  }
  addToCart(id: number) {
    this.cartService.addToCart(id);
  }
}
