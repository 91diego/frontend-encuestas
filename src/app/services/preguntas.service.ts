import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  constructor(private httpClient: HttpClient) { }

  // OBTIENE LAS PREGUNTAS ASOCIADAS A LA ENCUESTA, EL ID QUE SE RECIBE EN EL PARAMETRO ES DE LA ENCUESTA
  obtenerPreguntas(id: any) {

    return this.httpClient.get(environment.url_api + 'pregunta/' + id);
  }

  // CREA EL REGISTRO DE LA PREGUNTA
  crearPreguntas(pregunta: any) {

    return this.httpClient.post(environment.url_api + 'pregunta', pregunta);
  }
}
