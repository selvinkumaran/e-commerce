import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Product } from '../models/product';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}
  users: User[] = [
    { id: 1, email: 'user@gmail.com', password: 'User@2001' },
  ];
  loadUsers() {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }
  getAllUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') as string);
  }
  addUser() {
    const storedUsers = JSON.parse(localStorage.getItem('users') as string);
    storedUsers.push(this.users);
    localStorage.setItem('users', JSON.stringify(storedUsers));
  }
  setLoggedInUser(user: User): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }
  removeLoggedInUser(): void {
    localStorage.removeItem('loggedInUser');
  }
  isUserLoggedIn(): boolean {
    return localStorage.getItem('loggedInUser') !== null;
  }
  saveProducts(products: Product[]): void {
    localStorage.setItem('products', JSON.stringify(products));
  }
  getCachedProducts(): Product[] {
    return JSON.parse(localStorage.getItem('products') as string);
  }
  setCart(cart: Cart[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  getLoggedInUser(): User {
    return JSON.parse(localStorage.getItem('loggedInUser') as string);
  }
  getCart(): Cart[] {
    let cart = JSON.parse(localStorage.getItem('cart') as string);
    console.log(cart);

    if (cart === null) {
      cart = [];
    }
    return cart;
  }
  setProducts(products: Product[]): void {
    localStorage.setItem('products', JSON.stringify(products));
  }
}
