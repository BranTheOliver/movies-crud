import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.css']
})
export class ListagemFilmesComponent implements OnInit {

  readonly limit = 8;
  page = 0;
  filmes: Filme[] = [];
  filtrosListagem: FormGroup;
  generos: Array<string>;

  constructor(
    private filmesService: FilmesService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });

    this.generos = [
      'Ação',
      'Aventura',
      'Comédia',
      'Drama',
      'Ficção Cientifíca',
      'Romance',
      'Suspense',
      'Terror'
    ];

    this.listarFilmes();
  }

  onScroll(): void {
    this.listarFilmes();
  }

  private listarFilmes(): void {
    this.page++;
    this.filmesService.listar(this.page, this.limit).subscribe(
      (filmes: Filme[]) => this.filmes.push(...filmes)
    );
  }

}