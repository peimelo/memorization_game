import { Identification } from './identification.model';
import { Item } from './item.model';

export interface Container extends Identification {
  itemList: Item[];
}
