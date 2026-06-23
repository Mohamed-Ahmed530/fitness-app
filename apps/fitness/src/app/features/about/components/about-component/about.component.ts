import { Component } from '@angular/core';
import { SectionNameComponent } from "../../../../shared/ui/section-name/sectionName.component";
import { ActionButtonComponent } from "../../../../shared/components/ui/action-button/action-button.component";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [SectionNameComponent, ActionButtonComponent,TranslatePipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
 goals: { title: string; description: string; img: string }[] = [
  {
    title: 'home.aboutSection.goals.personalTrainer.title',
    description: 'home.aboutSection.goals.personalTrainer.description',
    img: '/icons/arrow.png'
  },
  {
    title: 'home.aboutSection.goals.cardioPrograms.title',
    description: 'home.aboutSection.goals.cardioPrograms.description',
    img: '/icons/arrow.png'
  },
  {
    title: 'home.aboutSection.goals.qualityEquipment.title',
    description: 'home.aboutSection.goals.qualityEquipment.description',
    img: '/icons/arrow.png'
  },
  {
    title: 'home.aboutSection.goals.healthyNutrition.title',
    description: 'home.aboutSection.goals.healthyNutrition.description',
    img: '/icons/arrow.png'
  }
];
}
