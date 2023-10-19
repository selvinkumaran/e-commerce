import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private storageServices: StorageService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.storageServices.loadUsers();
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
