import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragAreaComponent } from './components/drag-area/drag-area.component';
import { GamePanelComponent } from './components/game-panel/game-panel.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundPageComponent } from './components/not-found-page.component';
import { RecursiveCardComponent } from './components/recursive-card/recursive-card.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { GameDetailComponent } from './containers/game-detail/game-detail.component';
import { GameListComponent } from './containers/game-list/game-list.component';
import { TrustedHtmlPipe } from './pipes/trusted-html.pipe';
import { MaterialModule } from './shared/material.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DragAreaComponent,
    GameDetailComponent,
    GameListComponent,
    GamePanelComponent,
    RecursiveCardComponent,
    NotFoundPageComponent,
    ToolbarComponent,
    TrustedHtmlPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
