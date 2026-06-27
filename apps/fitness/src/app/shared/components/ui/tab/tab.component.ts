import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-tab',
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss',
})
export class TabComponent {
  tabName = input.required<string>();
  isActive = input<boolean>(); 
  tabClick = output(); 

  onClick() {
    this.tabClick.emit();
  }
}
