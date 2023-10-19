import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cartProducts: Product[] = [];
  total = 0;

  constructor(private cartService: CartService,private router:Router) {}

  ngOnInit(): void {
    this.cartProducts = this.cartService.getUserCart();
    console.log(this.cartProducts)
  }

  calculateTotalPrice(): number {
    return (this.total = this.cartProducts.reduce(
      (acc, product) => acc + product.price * product.count,
      0
    ));
  }

  ResetCart(){
    localStorage.removeItem('cart');
    this.router.navigate([''], { replaceUrl: true });
  }
}
