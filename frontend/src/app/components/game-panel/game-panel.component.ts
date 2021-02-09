import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../models';

@Component({
  selector: 'app-game-panel',
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.scss'],
})
export class GamePanelComponent {
  @Input() categories: Category[] = [];
  @Input() title = '';

  @Output() favorite = new EventEmitter<number>();
}
