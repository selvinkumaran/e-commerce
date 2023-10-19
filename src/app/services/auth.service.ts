import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storageService: StorageService) {}
  isValidUser(user: User): boolean {
    let users: User[] = this.storageService.getAllUsers();
    let isUser: boolean = false;
    for (let u of users) {
      if (u.email === user.email && u.password === user.password) {
        this.storageService.setLoggedInUser(u);
        isUser = true;
        break;
      }
    }
    return isUser;
  }

  logout(): void {
    this.storageService.removeLoggedInUser();
  }

  isLoggedIn(): boolean {
    return this.storageService.isUserLoggedIn();
  }
  getLoggedInUser(): User {
    return this.storageService.getLoggedInUser();
  }
}
