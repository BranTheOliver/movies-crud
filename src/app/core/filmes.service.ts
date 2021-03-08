import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filme } from '../shared/models/filme';

const url = 'http://localhost:3000/filmes/';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(
    private http: HttpClient
  ) { }

  salvar(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(url, filme);
  }

  listar(page: number, limit: number, text: string, gender: string): Observable<Filme[]>{
    let httpParams = new HttpParams();
    httpParams = httpParams.set('_page', page.toString());
    httpParams = httpParams.set('_limit', limit.toString());
    httpParams = httpParams.set('_sort', 'id');
    httpParams = httpParams.set('_order', 'desc');

    if (text){
      httpParams = httpParams.set('q', text);
    }

    if (gender){
      httpParams = httpParams.set('genero', gender);
    }

    return this.http.get<Filme[]>(url, {params: httpParams});
  }
}
