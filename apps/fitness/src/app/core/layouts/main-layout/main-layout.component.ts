import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationBarComponent } from '../../components/navigation-bar/navigation-bar.component';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, NavigationBarComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
