import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _PLATFORM_ID = inject(PLATFORM_ID);
  theme = signal<string>('light');
  private document = inject(DOCUMENT);

  constructor() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      const savedTheme = localStorage.getItem('theme') || 'light';
      this.theme.set(savedTheme);
      this.applyTheme(savedTheme);
    }
  
  }

 setTheme(newTheme: 'light' | 'dark') {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      localStorage.setItem('theme', newTheme);
      this.theme.set(newTheme);
      this.applyTheme(newTheme);
    }
  }

  private applyTheme(theme: string) {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      const isDark = 
        theme === 'dark' || 
        (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
      this.document.documentElement.classList.toggle('dark', isDark);
    }
  }
}
