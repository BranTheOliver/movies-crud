import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { FilmesService } from 'src/app/core/filmes.service';
import { ConfigParams } from 'src/app/shared/models/config-params';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.css']
})
export class ListagemFilmesComponent implements OnInit {

  readonly semFoto = 'https://th.bing.com/th/id/R2fa0e781e0ce67556696ff4c6c4b63e5?rik=hBRNVFxNOktXBQ&riu=http%3a%2f%2fwww.casadei.com%2fon%2fdemandware.static%2fSites-casadei-Site%2f-%2fdefault%2fdw4b2b381d%2fimages%2fnoimagezoom.png&ehk=wcv6SXPeSxuaULGIjt2rwDmNSUkUQD3%2fa2ISxDTgOkI%3d&risl=&pid=ImgRaw';
  
  config: ConfigParams = {
    pagina: 0,
    limite: 8
  }
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

    this.filtrosListagem.get('texto').valueChanges
    .pipe(debounceTime(400))
    .subscribe(
      (value: string) => {
        this.config.pesquisa = value;
        this.resetarConsulta();
      }
    );

    this.filtrosListagem.get('genero').valueChanges.subscribe(
      (value: string) => {
        this.config.campo = {tipo: 'genero', valor: value};
        this.resetarConsulta();
      }
    );

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
    this.config.pagina++;
    this.filmesService.listar(this.config).subscribe(
      (filmes: Filme[]) => this.filmes.push(...filmes)
    );
  }

  private resetarConsulta(): void{
    this.filmes = [];
    this.config.pagina = 0;
    this.listarFilmes();
  }

}