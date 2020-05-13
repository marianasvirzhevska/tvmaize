import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, User } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user: User;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.authService.user.subscribe(x => this.user = x);
  }

  handleLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authService.logout();
  }
}
