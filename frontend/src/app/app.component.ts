import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CategoriesService } from './services/categories.service';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) {
    this.categoriesService.getAll().subscribe();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-74X0CW4ZVS', {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }
}
