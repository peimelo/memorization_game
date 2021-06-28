import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Category, CategoryResponse, Container, Item } from '../models';

interface IDictionary {
  [id: string]: Item[];
}

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  url = `${environment.baseUrl}/categories`;

  private subject = new BehaviorSubject<Category[]>([]);

  categories$: Observable<Category[]> = this.subject.asObservable();

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url).pipe(
      tap((categories) => {
        this.subject.next(categories);
      })
    );
  }

  getChildren(
    children: Category[],
    parent: Category,
    containers: Container[],
    solve = false
  ): void {
    children.map((child) => {
      if (child.children.length === 0) {
        if (solve) {
          containers.map((container) => {
            if (container.id === parent.id) {
              container.itemList.push({
                name: child.name,
                ok: true,
                parent,
                parentNames: [parent.name],
              });
            }
          });
        } else {
          containers[0].itemList.push({
            name: child.name,
            ok: true,
            parent,
            parentNames: [],
          });
        }
      } else {
        this.getChildren(child.children, child, containers, solve);
      }
    });

    if (!solve) {
      this.getParentNames(containers[0]);
      this.shuffleArray(containers[0].itemList);
    }
  }

  getOne(id: number): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.url}/${id}`);
  }

  getParents(parent: Category, containers: Container[]): void {
    if (this.hasItem(parent.children)) {
      containers.push({
        id: parent.id,
        name: parent.name,
        itemList: [],
      });
    }

    parent.children.map((child) => {
      this.getParents(child, containers);
    });
  }

  hasContainer(children: Category[]): boolean {
    let value = false;

    children.map((child) => {
      if (child.children.length > 0) {
        value = true;
      }
    });

    return value;
  }

  hasItem(children: Category[]): boolean {
    for (let i = 0; i < children.length; i++) {
      return this.isItem(children[i]);
    }

    return false;
  }

  isItem(child: Category): boolean {
    return child.children.length === 0;
  }

  private getParentNames(container: Container) {
    const children = this.groupBy(container.itemList, 'name');

    container.itemList.map((item) => {
      item.parentNames = children[item.name].map((child) => child.parent.name);
    });
  }

  private groupBy(xs: Item[], key: keyof Item): IDictionary {
    return xs.reduce((objectsByKeyValue: IDictionary, obj: Item) => {
      const value = obj[key];

      objectsByKeyValue[<string>value] = (
        objectsByKeyValue[<string>value] || []
      ).concat(obj);

      return objectsByKeyValue;
    }, {});
  }

  private shuffleArray = (array: Item[]) => {
    let m = array.length,
      t,
      i;

    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  };
}
