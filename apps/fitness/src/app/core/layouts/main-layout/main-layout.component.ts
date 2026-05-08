import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { NavigationBarComponent } from "../../components/navigation-bar/navigation-bar.component";

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, NavigationBarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
