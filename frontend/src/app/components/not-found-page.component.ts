import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found-page',
  template: `
    <mat-card>
      <mat-card-title>404: Página não encontrada</mat-card-title>
      <mat-card-content>
        <p>Ei! Parece que a página não existe ainda.</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" routerLink="/">
          Ir para Início
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      :host {
        text-align: center;
      }
    `,
  ],
})
export class NotFoundPageComponent {}
