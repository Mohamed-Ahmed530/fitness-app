import { Component, OnInit, signal } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ActionButtonComponent } from "../../../shared/components/ui/action-button/action-button.component";

@Component({
  selector: 'app-navigation-bar',
  imports: [MenubarModule, RouterLink, RouterLinkActive, ActionButtonComponent],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent implements OnInit {
    items: MenuItem[] | undefined;

    isLoggedIn = signal(false);

    ngOnInit(): void {
        this.initMenuItems();
    }

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
}
