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

  // OBTIENE LAS PREGUNTA PREGUNTA POR SU ID
  detallePregunta(id: any) {

    return this.httpClient.get(environment.url_api + 'pregunta/mostrar/' + id);
  }

  // CREA EL REGISTRO DE LA PREGUNTA
  crearPreguntas(pregunta: any) {

    return this.httpClient.post(environment.url_api + 'pregunta', pregunta);
  }

  // EDITA LA PREGUNTA
  editarPregunta(id: any, pregunta: any) {

    console.log('ID FRONTEND: ' + id);
    return this.httpClient.put(environment.url_api + 'pregunta/' + id, pregunta);
  }
}
