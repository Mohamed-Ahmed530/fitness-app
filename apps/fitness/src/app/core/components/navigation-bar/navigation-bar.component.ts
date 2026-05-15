import { Component, computed, HostListener, inject, OnInit, signal } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ActionButtonComponent } from "../../../shared/components/ui/action-button/action-button.component";
import { AuthService } from '@fitness/auth-data-access';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navigation-bar',
  imports: [MenubarModule, RouterLink, RouterLinkActive, ActionButtonComponent],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent implements OnInit {
    
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
        if (window.scrollY > 0) {
        this.isScroll.set(true);
        } else {
        this.isScroll.set(true);
        }
    }


}
