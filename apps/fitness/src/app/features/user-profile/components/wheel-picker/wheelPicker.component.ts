import { Component, Input, Output, EventEmitter, ElementRef, AfterViewInit, OnDestroy, ViewChild, OnInit, Renderer2 } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';

@Component({
  selector: 'app-wheel-picker',
  standalone: true,
  imports: [],
  templateUrl: './wheelPicker.component.html',
  styleUrl: './wheelPicker.component.scss',
})
export class WheelPickerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;
  slider?: KeenSliderInstance;

  // المدخلات الديناميكية
  @Input() min: number = 80;
  @Input() max: number = 100;
  @Input() unit: string = 'kg';
  @Input() defaultValue: number = 90;

  // المخرج
  @Output() valueChange = new EventEmitter<number>();

  options: number[] = [];
  selectedValue: number = 0;

  constructor(private renderer: Renderer2) {} // نحتاج الـ Renderer لتحديث ستايل الـ slides

  ngOnInit() {
    this.selectedValue = this.defaultValue;
    for (let i = this.min; i <= this.max; i++) {
      this.options.push(i);
    }
  }

  ngAfterViewInit() {
    const initialIndex = this.options.indexOf(this.defaultValue);
 setTimeout(() => {
      if (this.sliderRef && this.sliderRef.nativeElement) {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      loop: false,
      vertical: false, // تمرير أفقي
      initial: initialIndex !== -1 ? initialIndex : 0,
      // عرض الأرقام: نحتاج عدد فردي لإبراز المنتصف
      slides: {
        perView: 7, // جربي قيم مختلفة: 5 أو 7 أو 9
        spacing: 0,
        origin: 'center',
      },
      // تفعيل تأثير الـ snap للتوقف عند الأرقام بدقة
      drag: true,
      rubberband: true,
      
      // دالة لتحديث تأثير الحجم واللون أثناء التحريك
      created: (s) => this.updateScale(s),
      detailsChanged: (s) => this.updateScale(s),
      
      slideChanged: (s) => {
        const currentIndex = s.track.details.rel;
        const newValue = this.options[currentIndex];

        if (this.selectedValue !== newValue) {
          this.selectedValue = newValue;
          this.valueChange.emit(this.selectedValue);
        }
      },
    });
  }},50)
  }

  // دالة مخصصة لحساب المسافة من المنتصف وتطبيق التدرج في الحجم واللون
  private updateScale(slider: KeenSliderInstance) {
    const details = slider.track.details;
    details.slides.forEach((slideDetails, idx) => {
      // حساب مدى قرب السلايد من المنتصف (من -1 إلى 1)
      const portion = slideDetails.portion;
      const opacity = 1 - Math.abs(portion);
      const scale = 1 + (0.5 * opacity); // تكبير الرقم المركزي بنسبة 50%

      const slideEl = slider.container.children[idx];
      
      // تطبيق تأثير الحجم واللون باستخدام الـ Renderer2
      this.renderer.setStyle(slideEl, 'transform', `scale(${scale})`);
      this.renderer.setStyle(slideEl, 'opacity', Math.max(0.2, opacity)); // تبهيت الأرقام البعيدة

      // تطبيق لون برتقالي خالص للرقم النشط في المنتصف
      if (opacity === 1) {
        this.renderer.addClass(slideEl, 'active-orange');
      } else {
        this.renderer.removeClass(slideEl, 'active-orange');
      }
    });
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }
}