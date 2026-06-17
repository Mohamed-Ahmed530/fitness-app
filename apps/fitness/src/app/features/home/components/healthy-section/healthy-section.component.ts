import { Component, signal } from '@angular/core';
import { SectionNameComponent } from '../../../../shared/ui/section-name/sectionName.component';
import { ExploreCardComponent, IExploreCard } from '../../../../shared/components/ui/explore-card/explore-card.component';

@Component({
  selector: 'app-healthy-section',
  standalone: true,
  imports: [SectionNameComponent, ExploreCardComponent],
  templateUrl: './healthy-section.component.html',
  styleUrl: './healthy-section.component.scss',
})
export class HealthySectionComponent {
  meals = signal<IExploreCard[]>([
    {
      title: 'BREAKFAST',
      image: '/images/healthy-3.jpg',
      link: '/healthy',
      actionLabel: 'Read More'
    },
    {
      title: 'LUNCH',
      image: '/images/healthy-2.jpg',
      link: '/healthy',
      actionLabel: 'Read More'
    },
    {
      title: 'DINNER',
      image: '/images/healthy-1.jpg',
      link: '/healthy',
      actionLabel: 'Read More'
    }
  ]);
}
