import { Category } from './category.model';

export interface Item {
  name: string;
  ok: boolean;
  parent: Category;
  parentNames: string[];
}
