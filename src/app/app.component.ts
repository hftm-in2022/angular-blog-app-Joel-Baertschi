import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'blog-app';
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.initializeAuth(); // Sicherstellen, dass der Auth-Status überprüft wird
  }
}
