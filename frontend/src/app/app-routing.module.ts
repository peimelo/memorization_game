import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundPageComponent } from './components/not-found-page.component';
import { GameDetailComponent } from './containers/game-detail/game-detail.component';
import { GameListComponent } from './containers/game-list/game-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games/:id', component: GameDetailComponent },
  { path: 'games', component: GameListComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
