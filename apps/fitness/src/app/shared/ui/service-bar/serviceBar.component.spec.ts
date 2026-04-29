import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceBarComponent } from './serviceBar.component';

describe('ServiceBarComponent', () => {
  let component: ServiceBarComponent;
  let fixture: ComponentFixture<ServiceBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceBarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
