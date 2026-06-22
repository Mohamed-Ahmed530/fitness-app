import { Component, OnInit, computed, HostListener, inject, signal } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@fitness/auth-data-access';
import { CookieService } from 'ngx-cookie-service';
import { ActionButtonComponent } from "../../../../../shared/components/ui/action-button/action-button.component";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, RouterLink, RouterLinkActive, ActionButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {

    private readonly authService = inject(AuthService);
    private readonly cookieService = inject(CookieService);
    private readonly translate = inject(TranslateService);

    isScroll = signal<boolean>(false);

   items = computed<MenuItem[]>(() => {


    return [
      {
        label: this.translate.instant('nav.home'), 
        routerLink: '/home'
      },
      {
        label: this.translate.instant('nav.about'),
        routerLink: '/about'
      },
      {
        label: this.translate.instant('nav.classes'),
        routerLink: '/classes'
      },
      {
        label: this.translate.instant('nav.healthy'),
        routerLink: '/healthy'
      },
    ];
  });
    loggedIn = computed(() => this.authService.isLoggedIn())

    ngOnInit(): void {
        this.checkAuthStatus();
    }

    checkAuthStatus() {
        if(this.cookieService.get('fitness-access-token')) {
            this.authService.isLoggedIn.set(true);
        }
    }

    @HostListener('window:scroll') onscroll() {
        this.isScroll.set(window.scrollY > 0);
    }

}
