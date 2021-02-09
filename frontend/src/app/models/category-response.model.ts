import { Category } from './category.model';
import { Identification } from './identification.model';

export interface CategoryResponse extends Identification {
  subtitles: Identification[];
  tree: Category[];
}
