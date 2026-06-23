import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsCardComponent } from './settingsCard.component';

describe('SettingsCardComponent', () => {
  let component: SettingsCardComponent;
  let fixture: ComponentFixture<SettingsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
