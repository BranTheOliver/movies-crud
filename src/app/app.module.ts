import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { AppComponent } from './app.component';


import { FilmesModule } from './filmes/filmes.module';
import { TopoComponent } from './shared/components/topo/topo.component';
import { RodapeComponent } from './shared/components/rodape/rodape.component';
import { MaterialModule } from './shared/components/material/material.module';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    RodapeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    AppRoutingModule,
    FilmesModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt' }],
  bootstrap: [AppComponent]
})
export class AppModule { }