import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { StorageService } from './storage.service';
import { User } from '../models/user';
import { Cart } from '../models/cart';
import { ProductService } from './product.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Product[] = [];
  constructor(
    private storageServive: StorageService,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  getCount(): number {
    let cart: Cart[] = this.storageServive.getCart();
    let loggedInUser: User = this.authService.getLoggedInUser();
    let userCart: Cart | undefined = cart.find(
      (o) => o.user.id === loggedInUser.id
    );
    let count: number = 0;
    if (userCart) {
      for (let product of userCart.cart) {
        if (product.count) {
          count += product.count;
        }
      }
    }
    return count;
  }

  addToCart(productId: number): void {
    let cart: Cart[] = this.storageServive.getCart();
    console.log(cart);
    let loggedInUser: User = this.authService.getLoggedInUser();
    console.log(loggedInUser);

    let products: Product[] = this.productService.getLocalProducts();
    console.log(products);

    let product: Product | undefined = products.find((o) => o.id === productId);
    if (product) {
      let userCart: Cart | undefined = cart.find(
        (o) => o.user.id === loggedInUser.id
      )!;
      if (userCart) {
        let productExists: Product | undefined = userCart?.cart.find(
          (o) => o.id === productId
        );
        if (productExists) {
          let newCart: Product[] = [];
          for (let product of userCart?.cart) {
            if (product.id === productId) {
              newCart.push({ ...product, count: product.count! + 1 });
              console.log(newCart);
            } else {
              newCart.push(product);
              console.log(newCart);
            }
          }
          userCart.cart = newCart;
        } else {
          userCart?.cart.push({ ...product, count: 1 });
          console.log(userCart);
        }
        let updatedCart: Cart[] = cart.filter(
          (c) => c.user.id !== loggedInUser.id
        );
        updatedCart.push(userCart);
        this.storageServive.setCart(updatedCart);
        console.log('updated' + updatedCart);
      } else {
        let newCart: Cart = {
          user: loggedInUser,
          cart: [{ ...product, count: 1 }],
        };
        cart.push(newCart);
        this.storageServive.setCart(cart);
        console.log('cart', cart);
      }
    }
  }

  getUserCart(): Product[] {
    let loggedInUser: User = this.storageServive.getLoggedInUser();
    let cart: Cart[] = this.storageServive.getCart();
    if (cart) {
      let userCart: Product[] | undefined = cart.find(
        (o) => o.user.id === loggedInUser.id
      )?.cart;
      if (!userCart) userCart = [];
      return userCart;
    } else {
      return [];
    }
  }
}
