import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.css']
})
export class VisualizarFilmesComponent implements OnInit {
  readonly semFoto = 'https://th.bing.com/th/id/R2fa0e781e0ce67556696ff4c6c4b63e5?rik=hBRNVFxNOktXBQ&riu=http%3a%2f%2fwww.casadei.com%2fon%2fdemandware.static%2fSites-casadei-Site%2f-%2fdefault%2fdw4b2b381d%2fimages%2fnoimagezoom.png&ehk=wcv6SXPeSxuaULGIjt2rwDmNSUkUQD3%2fa2ISxDTgOkI%3d&risl=&pid=ImgRaw';
  filme: Filme;

  constructor(
    private activatedRoute: ActivatedRoute,
    private filmesService: FilmesService
  ) { }

  ngOnInit(): void {
    this.visualizar(this.activatedRoute.snapshot.params['id']);
  }

  private visualizar(id: number): void {
    this.filmesService.visualizar(id).subscribe(
      (filme: Filme) => this.filme = filme
    );
  }

}
