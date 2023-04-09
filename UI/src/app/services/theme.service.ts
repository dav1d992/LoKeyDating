/* eslint-disable @typescript-eslint/naming-convention */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeLink = this.document.getElementById('theme') as HTMLLinkElement;
  public theme: string | null = null;
  public assetsPath = false;

  constructor(@Inject(DOCUMENT) private document: Document) {
    if (localStorage.getItem('theme')) {
      this.theme = localStorage.getItem('theme');
      this.themeLink.href = localStorage.getItem('theme') + '.css';
    } else this.setTheme('bootstrap4-light-blue');
  }

  public setTheme(theme: string) {
    this.theme = theme;
    localStorage.setItem('theme', this.theme);

    if (this.themeLink) {
      this.themeLink.href = this.theme + '.css';
    }
  }

  public isDarkMode(): boolean {
    if (!this.theme) {
      return false;
    }

    if (this.theme === 'bootstrap4-dark-blue') {
      return true;
    }

    return false;
  }
}
