import { Component, OnInit, computed, HostListener, inject, signal } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@fitness/auth-data-access';
import { CookieService } from 'ngx-cookie-service';
import { ActionButtonComponent } from "../../../../../shared/components/ui/action-button/action-button.component";

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, RouterLink, RouterLinkActive, ActionButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {

    private readonly authService = inject(AuthService);
    private readonly cookieService = inject(CookieService);

    isScroll = signal<boolean>(false);

    items: MenuItem[] | undefined;
    private initMenuItems(): void {
        this.items = [
            {
                label: 'Home', routerLink: '/home'
            },
            {
                label: 'About', routerLink: '/about'
            },
            {
                label: 'Classes', routerLink: '/classes'
            },
            {
                label: 'Healthy', routerLink: '/healthy'
            },
        ];
    }

    loggedIn = computed(() => this.authService.isLoggedIn())

    ngOnInit(): void {
        this.initMenuItems();
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
