import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Filme } from 'src/app/shared/models/filme';
import { FilmesService } from 'src/app/core/filmes.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.css']
})
export class CadastroFilmesComponent implements OnInit {
  id: number;
  cadastro: FormGroup;
  generos: Array<string>;

  constructor(
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private filmeService: FilmesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id){
      this.filmeService.visualizar(this.id).subscribe(
        (filme: Filme) => this.criarForm(filme)
      );
    } else {
      this.criarForm(this.criarFormEmBranco());
    }

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

  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    const filme = this.cadastro.getRawValue() as Filme;
    if(this.id){
      filme.id = this.id;
      this.editar(filme);
    } else {
      this.salvar(filme);
    }
    
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private criarForm(filme: Filme): void {
    this.cadastro = this.fb.group({
      titulo: [filme.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: [filme.urlFoto, [Validators.minLength(10)]],
      dtLancamento: [filme.dtLancamento, [Validators.required]],
      descricao: [filme.descricao],
      nota: [filme.nota, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: [filme.urlIMDb, [Validators.minLength(10)]],
      genero: [filme.genero, [Validators.required]]
    });
  }

  private criarFormEmBranco(): Filme {
    return {
      id: null,
      titulo: null,
      urlFoto: null,
      dtLancamento: null,
      descricao: null,
      nota: null,
      urlIMDb: null,
      genero: null
    } as Filme
  }

  private salvar(filme: Filme): void {
    this.filmeService.salvar(filme).subscribe(
      () => {
        const config = {
          data: {
            btnSuccess: 'Ir para a listagem',
            btnCancel: 'Cadastrar um novo filme',
            corBtnCancel: 'accent',
            possuirBtnFechar: true
          } as Alerta
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe(
          (op: boolean) => {
            if (op){
              this.router.navigateByUrl('filmes');
            } else {
              this.reiniciarForm();
            }
          }
        );
      },
      () => {
        const config = {
          data: {
            titulo: 'Erro ao salvar o registro!',
            descricao: 'Não conseguimos salvar o seu registro, favor tentar novamente mais tarde',
            corBtnSuccess: 'warn',
            btnSuccess: 'Fechar',
          } as Alerta
        };
        this.dialog.open(AlertaComponent, config);
      }
    );
  }

  private editar(filme: Filme): void {
    this.filmeService.editar(filme).subscribe(
      () => {
        const config = {
          data: {
            btnSuccess: 'Ir para a listagem',
            descricao: 'Seu registro foi atualizado com sucesso.'
          } as Alerta
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe(
          () => this.router.navigateByUrl('filmes')
        );
      },
      () => {
        const config = {
          data: {
            titulo: 'Erro ao editar o registro!',
            descricao: 'Não conseguimos editar o seu registro, favor tentar novamente mais tarde',
            corBtnSuccess: 'warn',
            btnSuccess: 'Fechar',
          } as Alerta
        };
        this.dialog.open(AlertaComponent, config);
      }
    );
  }

}
