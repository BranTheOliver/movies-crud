import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CadastroFilmesComponent } from './cadastro-filmes/cadastro-filmes.component';
import { ListagemFilmesComponent } from './listagem-filmes/listagem-filmes.component';
import { MaterialModule } from '../shared/components/material/material.module';
import { CamposModule } from '../shared/components/campos/campos.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    CamposModule
  ],
  declarations: [CadastroFilmesComponent, ListagemFilmesComponent]
})
export class FilmesModule { }