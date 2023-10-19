import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
  constructor(private cartService: CartService) {}
  cartProducts: Product[] = [];
  total = 0;
  todayDate!: Date;

  ngOnInit(): void {
    this.todayDate = new Date();
  }
}
