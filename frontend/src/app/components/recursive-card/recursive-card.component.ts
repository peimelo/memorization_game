import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { Category, Container } from '../../models';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-recursive-card',
  templateUrl: './recursive-card.component.html',
})
export class RecursiveCardComponent {
  @Input() game!: Category;
  @Input() containers!: Container[];
  @Input() connectedTo!: string[];

  constructor(private categoriesService: CategoriesService) {}

  enterPredicate(containers: Container[]) {
    let unique = true;

    return function (drag: CdkDrag, drop: CdkDropList) {
      containers.map((container) => {
        if (container.id === +drop.id) {
          const uniqueList = container.itemList.filter(
            (item) => item.name === drag.data['name']
          );

          if (uniqueList.length > 0) {
            unique = false;
          }
        }
      });

      return unique;
    };
  }

  hasContainer(children: Category[]): boolean {
    return this.categoriesService.hasContainer(children);
  }

  hasItem(children: Category[]): boolean {
    return this.categoriesService.hasItem(children);
  }

  isItem(child: Category): boolean {
    return this.categoriesService.isItem(child);
  }
}
