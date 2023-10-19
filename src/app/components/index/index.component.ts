import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
})
export class IndexComponent {
  constructor(private router: Router) {}
  home() {
    this.router.navigate(['/home'], { replaceUrl: true });
  }
  goSignIn() {
    this.router.navigate(['/login'], { replaceUrl: true });
  }
  goSignUp() {
    this.router.navigate(['/register'], { replaceUrl: true });
  }
}
