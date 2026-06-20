import { Component, ElementRef, ViewChild, input, output, signal, effect, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wheel-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wheelPicker.component.html',
  styleUrl: './wheelPicker.component.scss',
})
export class WheelPickerComponent{
@ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef<HTMLDivElement>;

  min = input<number>(30);
  max = input<number>(200);
  step = input<number>(1);
  unit = input<string>('kg');

  valueChange = output<number>();
  selectedValue = signal<number>(90);
  rangeArray = signal<number[]>([]);

  isDown = false;
  startX = 0;
  scrollLeftStart = 0;

  constructor() {
   
    effect(() => {
      const arr: number[] = [];
      for (let i = this.min(); i <= this.max(); i += this.step()) {
        arr.push(i);
      }
      this.rangeArray.set(arr);

      const checkAndScroll = () => {
        const container = this.scrollContainer?.nativeElement;
        if (container && container.offsetWidth > 0) { 
          const items = container.querySelectorAll('.ruler-item');
          const targetIndex = arr.indexOf(this.selectedValue());

          if (items.length > 0 && targetIndex !== -1) {
            const targetItem = items[targetIndex] as HTMLElement;
            if (targetItem) {
              
              container.style.scrollBehavior = 'auto';
              
              targetItem.scrollIntoView({
                behavior: 'auto',
                block: 'nearest',
                inline: 'center'
              });

              this.updateItemsSizing(container, targetIndex);

              setTimeout(() => {
                container.style.scrollBehavior = 'smooth';
              }, 50);
            }
          }
        } else {
          requestAnimationFrame(checkAndScroll);
        }
      };

      requestAnimationFrame(checkAndScroll);
    });
  }

  onScroll(event: Event): void {
    const container = event.target as HTMLDivElement;
    const containerCenter = container.getBoundingClientRect().left + (container.offsetWidth / 2);
    const items = container.querySelectorAll('.ruler-item');

    let closestItemIndex = 0;
    let minDistance = Infinity;

    items.forEach((item: any, i: number) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + (itemRect.width / 2);
      const distance = Math.abs(containerCenter - itemCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestItemIndex = i;
      }
    });

    if (closestItemIndex >= 0 && closestItemIndex < this.rangeArray().length) {
      const newValue = this.rangeArray()[closestItemIndex];
      if (this.selectedValue() !== newValue) {
        this.selectedValue.set(newValue);
        this.valueChange.emit(newValue);
      }
    }

    this.updateItemsSizing(container, closestItemIndex);
  }

  private updateItemsSizing(container: HTMLDivElement, closestIndex: number): void {
    const items = container.querySelectorAll('.ruler-item');
    items.forEach((item: any, i: number) => {
      const distanceFromActive = Math.abs(i - closestIndex);

      let fontSize = '12px';
      let opacity = '0.3';

      switch (distanceFromActive) {
        case 0:
          fontSize = '48px';
          opacity = '1';
          break;
        case 1:
          fontSize = '38px';
          opacity = '0.8';
          break;
        case 2:
          fontSize = '24px';
          opacity = '0.6';
          break;
        case 3:
          fontSize = '16px';
          opacity = '0.4';
          break;
        case 4:
          fontSize = '12px';
          opacity = '0.2';
          break;
        default:
          fontSize = '12px';
          opacity = '0';
          break;
      }

      const label = item.querySelector('.label-number');
      if (label) {
        label.style.fontSize = fontSize;
        item.style.opacity = opacity;
      }
    });
  }

  onMouseDown(e: MouseEvent): void {
    const container = this.scrollContainer.nativeElement;
    this.isDown = true;
    container.classList.add('active');
    container.style.scrollBehavior = 'auto'; 
    this.startX = e.pageX - container.offsetLeft;
    this.scrollLeftStart = container.scrollLeft;
  }

  onMouseLeave(): void {
    if (!this.isDown) return;
    this.stopDragging();
  }

  onMouseUp(): void {
    if (!this.isDown) return;
    this.stopDragging();
  }

  onMouseMove(e: MouseEvent): void {
    if (!this.isDown) return;
    e.preventDefault();
    const container = this.scrollContainer.nativeElement;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - this.startX) * 1.5; 
    container.scrollLeft = this.scrollLeftStart - walk;
  }

  private stopDragging(): void {
    this.isDown = false;
    const container = this.scrollContainer.nativeElement;
    container.classList.remove('active');
    container.style.scrollBehavior = 'smooth';
    
    const containerCenter = container.getBoundingClientRect().left + (container.offsetWidth / 2);
    const items = container.querySelectorAll('.ruler-item');
    
    let closestItem: any = null;
    let minDistance = Infinity;

    items.forEach((item: any) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + (itemRect.width / 2);
      const distance = Math.abs(containerCenter - itemCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestItem = item;
      }
    });

    if (closestItem) {
      const containerRect = container.getBoundingClientRect();
      const itemCenterInContainer = (closestItem.getBoundingClientRect().left + closestItem.offsetWidth / 2) - containerRect.left;
      const targetScroll = container.scrollLeft + (itemCenterInContainer - container.offsetWidth / 2);
      container.scrollLeft = targetScroll;
    }
  }
}