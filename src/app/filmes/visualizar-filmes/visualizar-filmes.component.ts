import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.css']
})
export class VisualizarFilmesComponent implements OnInit {
  readonly semFoto = 'https://th.bing.com/th/id/R2fa0e781e0ce67556696ff4c6c4b63e5?rik=hBRNVFxNOktXBQ&riu=http%3a%2f%2fwww.casadei.com%2fon%2fdemandware.static%2fSites-casadei-Site%2f-%2fdefault%2fdw4b2b381d%2fimages%2fnoimagezoom.png&ehk=wcv6SXPeSxuaULGIjt2rwDmNSUkUQD3%2fa2ISxDTgOkI%3d&risl=&pid=ImgRaw';
  filme: Filme;
  id: number;

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private filmesService: FilmesService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

  excluir(): void {
    const config = {
      data: {
        titulo: 'Tem certeza que deseja excluir esse filme?',
        descricao: 'Caso tenha certeza que deseja excluir clique no botão OK',
        possuirBtnFechar: true,
        corBtnCancel: 'primary',
        corBtnSuccess: 'warn'
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe(
      (op: boolean) => {
        if (op){
          this.filmesService.excluir(this.id).subscribe(
            () => this.router.navigateByUrl('/filmes')
          );
        }
      }
    );
  }

  editar(): void {
    this.router.navigateByUrl('/filmes/cadastro/' + this.id);
  }

  private visualizar(): void {
    this.filmesService.visualizar(this.id).subscribe(
      (filme: Filme) => this.filme = filme
    );
  }

}
