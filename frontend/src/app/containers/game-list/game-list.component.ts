import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Category } from '../../models';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {
  categoryFavorites: Category[] = [];
  categoryNotFavorites: Category[] = [];
  private categories$!: Observable<Category[]>;
  categories: Category[] = [];
  private favorites: number[] = [];
  timeRemain = 20;

  constructor(private categoriesService: CategoriesService) {
    this.categories$ = this.categoriesService.categories$;

    const favorites = localStorage.getItem('favorites');

    if (favorites) {
      this.favorites = JSON.parse(favorites);
    }
  }

  ngOnInit(): void {
    this.categories$.subscribe((categories) => {
      this.categories = categories;
      this.getLists();
      this.sanitizeFavorites();
    });

    this.countDown();
  }

  private countDown() {
    interval(1000)
      .pipe(take(20))
      .subscribe((value) => (this.timeRemain = 20 - value));
  }

  favorite(id: number) {
    const index = this.favorites.indexOf(id);

    if (index > -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(id);
    }

    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    this.getLists();
  }

  private sanitizeFavorites() {
    const favorites: number[] = [];

    this.favorites.map((favorite) => {
      if (this.categories.find((category) => category.id === favorite)) {
        favorites.push(favorite);
      }
    });

    this.favorites = favorites;
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  private getLists() {
    this.categoryFavorites = [];
    this.categoryNotFavorites = [];

    this.categories.map((category) => {
      if (this.favorites.includes(category.id)) {
        this.categoryFavorites.push(category);
      } else {
        this.categoryNotFavorites.push(category);
      }
    });
  }
}
