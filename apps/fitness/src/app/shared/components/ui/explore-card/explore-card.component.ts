import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface IExploreCard {
  title: string;
  image: string;
  link?: string;
  actionLabel?: string;
}

@Component({
  selector: 'app-explore-card',
  imports: [RouterLink],
  templateUrl: './explore-card.component.html',
  styleUrl: './explore-card.component.scss',
})
export class ExploreCardComponent {
  data = input.required<IExploreCard>();
  fallbackImage = input<string>('images/muscle-default.png');
}

