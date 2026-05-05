import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionNameComponent } from './sectionName.component';

describe('SectionNameComponent', () => {
  let component: SectionNameComponent;
  let fixture: ComponentFixture<SectionNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionNameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionNameComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
