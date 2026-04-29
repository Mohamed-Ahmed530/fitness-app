import { Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from './shared/services/theme-service/theme.service';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'fitness';
 constructor(private themeService: ThemeService) {}
}
