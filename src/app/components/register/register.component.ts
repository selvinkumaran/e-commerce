import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  id: number = 2;
  email: string = '';
  password: string = '';
  constructor(private router: Router) {}

  onSubmit(RegisterForm: NgForm) {
    let newUser: User[] = [
      { id: this.id + 1, email: this.email, password: this.password },
    ];
    let users = JSON.parse(localStorage.getItem('users') as string);
    users = [...users, ...newUser];
    localStorage.setItem('users', JSON.stringify(users));
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
