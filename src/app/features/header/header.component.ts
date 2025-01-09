import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // Abonniere den Benutzernamen und gebe ihn in der Konsole aus
    this.authService.userName$.subscribe((userName) => {
      if (userName) {
        console.log('Benutzername:', userName);
      }
    });
  }

  // Login und Logout verwenden die Methoden aus dem AuthService
  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }
}
