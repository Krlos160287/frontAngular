import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as environment from '../../../environments/environment'
import { Libro } from 'src/app/models/libro.model';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  url =  environment.environment.api.url + "/libreria";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //Authorization: 'Bearer ' + token,
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Origin': '*'
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  public getAllLibros(): Observable<any> {

    return this.http.get<any>(`${this.url}/getlibros`);
  }

  public saveLibro(body: Libro) {
    return this.http.post<any>(`${this.url}/savelibros`, body, this.httpOptions);
  }

  public updateLibro(id: number, body: Libro) {
    return this.http.put<any>(`${this.url}/updatelibro/${id}`, body, this.httpOptions);
  }

  public deleteLibro(id: number) {
    return this.http.delete<any>(`${this.url}/deletelibro/${id}`, this.httpOptions);
  }
}
