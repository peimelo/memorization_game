import { Identification } from './identification.model';

export interface Category extends Identification {
  children: Category[];
}
