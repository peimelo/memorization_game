import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { Category, Container, Identification, Item } from '../../models';

@Component({
  selector: 'app-drag-area',
  templateUrl: './drag-area.component.html',
  styleUrls: ['./drag-area.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DragAreaComponent implements OnChanges {
  container!: Container;

  @Input() containers!: Container[];
  @Input() connectedTo!: string[];
  @Input() enterPredicate: any;
  @Input() subtitles: Identification[] = [];

  // private
  @Input() game!: Category;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && (changes.game || changes.containers)) {
      this.containers.map((container) => {
        if (container.id === this.game.id || container.id === 0) {
          this.container = container;
        }
      });
    }
  }

  drop(event: CdkDragDrop<Item[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
