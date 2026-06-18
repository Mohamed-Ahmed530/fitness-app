import { Component, inject, OnInit, PLATFORM_ID} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from './shared/services/theme-service/theme.service';
import { isPlatformBrowser } from '@angular/common';
import { TranslationMyAppService } from './shared/services/TranslationMyApp/translation-my-app.service';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit{
  protected title = 'fitness';
 constructor(private themeService: ThemeService, private translationMyAppService:TranslationMyAppService) {}
 private _PLATFORM_ID= inject(PLATFORM_ID)

 ngOnInit(): void {
   if (isPlatformBrowser(this._PLATFORM_ID)) {
    const storedLang = localStorage.getItem('lang');
    const lang: 'en' | 'ar' = storedLang === 'ar' ? 'ar' : 'en';
    this.translationMyAppService.setLanguage(lang);
   }
 }


}
