import { Component } from '@angular/core';
import { SectionNameComponent } from "../../../../shared/ui/section-name/sectionName.component";
import { ActionButtonComponent } from "../../../../shared/components/ui/action-button/action-button.component";

@Component({
  selector: 'app-about',
  imports: [SectionNameComponent, ActionButtonComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  goals: { title: string; description: string ,img:string}[] = [
    {
      title: 'Personal Trainer',
      description: 'Achieve your fitness goals with the guidance of our certified trainers.',
      img:'/icons/arrow.png'
    },
    {
      title:'Cardio Programs',
      description:'From steady-state runs to interval sprints, our treadmill programs.',
      img:'/icons/arrow.png'
    },
    
    {
      title:'Quality Equipment',
      description:'Our gym is equipped with the latest cardio & strength machines.',
      img:'/icons/arrow.png'
    },
    
    {
      title:'Healthy Nutritions',
      description:'Fuel your fitness journey with customized meal plans for you.',
      img:'/icons/arrow.png'
    }
    
  ];
}
