import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    CommonModule,
    RouterModule,
    TranslateModule,
  ],
})
export class SidebarComponent implements OnInit {
  languages = ['en', 'de'];

  @ViewChild('drawer') drawer!: MatSidenav;
  private breakpointObserver = inject(BreakpointObserver);
  constructor(
    public authService: AuthService,
    private translate: TranslateService,
  ) {
    // Sprachen konfigurieren und Standard-Sprache setzen
    this.translate.addLangs(this.languages);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  ngOnInit(): void {
    // Abonniere den Benutzernamen und gebe ihn in der Konsole aus
    this.authService.userName$.subscribe((userName) => {
      if (userName) {
        console.log('Benutzername:', userName);
      }
    });

    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        if (!result.matches && this.drawer && this.drawer.opened) {
          this.drawer.close();
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

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
