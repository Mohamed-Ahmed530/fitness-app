import { Component, computed, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@fitness/auth-data-access';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navigation-bar',
  imports: [MenubarModule, RouterLink, RouterLinkActive],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent implements OnInit {
    
    private readonly authService = inject(AuthService);
    private  platformId = inject(PLATFORM_ID);

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
        if(isPlatformBrowser(this.platformId)){
            if(localStorage.getItem('fitness-access-token')) {
                this.authService.isLoggedIn.set(true);
            }
        }
    }


}
