import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-explore-card',
  imports: [RouterLink],
  templateUrl: './explore-card.component.html',
  styleUrl: './explore-card.component.scss',
})
export class ExploreCardComponent {
  title = input.required<string>();
  image = input.required<string>();
  link = input<string>('');
}
