import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  constructor(private httpClient: HttpClient) { }

  obtenerPreguntas(id: any) {

    return this.httpClient.get(environment.url_api + 'pregunta/' + id);
  }

  crearPreguntas(pregunta: any) {

    return this.httpClient.post(environment.url_api + 'pregunta', pregunta);
  }
}
