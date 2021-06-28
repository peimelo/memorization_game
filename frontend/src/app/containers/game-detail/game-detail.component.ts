import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Container, Identification } from '../../models';
import { CategoriesService } from '../../services/categories.service';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
})
export class GameDetailComponent implements OnInit {
  game!: Category;

  containers!: Container[];

  subtitles!: Identification[];

  private result = {
    hits: 0,
    errors: 0,
  };

  connectedTo: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private googleAnalyticsService: GoogleAnalyticsService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.getGame();
  }

  enterPredicate() {
    return function () {
      return true;
    };
  }

  getHits(): void {
    this.containers.slice(1).map((container) => {
      if (container.itemList.length > 0) {
        this.checkHits(container);
      }
    });
  }

  startGame(solve = false): void {
    this.connectedTo = [];
    this.containers = [
      {
        id: 0,
        name: 'Itens para arrastar',
        itemList: [],
      },
    ];

    this.categoriesService.getParents(this.game, this.containers);

    this.categoriesService.getChildren(
      this.game.children,
      this.game,
      this.containers,
      solve
    );

    for (let container of this.containers) {
      this.connectedTo.push(container.id.toString());
    }

    if (solve) {
      this.googleAnalyticsService.eventEmitter(
        'solve',
        'game',
        'click',
        'Solve'
      );
    } else {
      this.googleAnalyticsService.eventEmitter(
        'restart',
        'game',
        'click',
        'Restart'
      );
    }
  }

  validate(): void {
    this.result = {
      hits: 0,
      errors: 0,
    };

    this.getHits();

    const msg =
      `Acertos: ${this.result.hits} | ` +
      `Erros: ${this.result.errors} | ` +
      `Em branco: ${this.containers[0].itemList.length}`;

    this.openSnackBar(msg);

    this.googleAnalyticsService.eventEmitter(
      'validate',
      'game',
      'click',
      'Validate'
    );
  }

  private checkHits(container: Container): void {
    const containerName = container.name.toLowerCase();

    container.itemList.map((item) => {
      if (
        !!item.parentNames.filter(
          (parentName) => parentName.toLowerCase() === containerName
        ).length
      ) {
        this.result = {
          ...this.result,
          hits: this.result.hits + 1,
        };

        item.ok = true;
      } else {
        this.result = {
          ...this.result,
          errors: this.result.errors + 1,
        };

        item.ok = false;
      }
    });
  }

  private getGame(): void {
    this.route.params.subscribe((params) =>
      this.categoriesService.getOne(+params['id']).subscribe(
        (game) => {
          this.game = game.tree[0];
          this.subtitles = game.subtitles;

          this.startGame();
          this.titleService.setTitle(`${this.game.name} - Jogo da Memorização`);
        },
        () => {
          this.openSnackBar('Jogo não encontrado.');
          this.router.navigate(['']);
        }
      )
    );
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 5000,
    });
  }
}
