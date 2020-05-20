import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PreguntasService } from './../services/preguntas.service';
import { EncuestasService } from './../services/encuestas.service';

import { Preguntas } from './../interfaces/preguntas';
import { Encuestas } from '../interfaces/encuestas';

@Component({
  selector: 'app-detalles-encuesta',
  templateUrl: './detalles-encuesta.component.html',
  styleUrls: ['./detalles-encuesta.component.scss']
})
export class DetallesEncuestaComponent implements OnInit {

  id;
  nombreEncuesta;
  encuestaDetalle: Encuestas[];
  preguntasEncuesta: Preguntas[];

  constructor(private activatedRoute: ActivatedRoute,
              private encuestasService: EncuestasService,
              private preguntasService: PreguntasService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.encuesta(this.id);
    this.preguntas(this.id);
  }

  // MUESTRA LA ENCUESTA DE ACUERDO AL ID
  encuesta(id: any) {
    this.encuestasService.detalleEncuesta(id)
    .subscribe((data: Encuestas[]) => {

      this.encuestaDetalle = data;
      console.log('Detalle de la encuesta con id: ' + this.id);
      console.log(this.encuestaDetalle);
    });
  }

  // MUESTRA LAS PREGUNTAS ASOCIADAS AL ID DE LA ENCUESTA
  preguntas(id: any) {
    this.preguntasService.obtenerPreguntas(id)
    .subscribe((data: Preguntas[]) => {

      this.preguntasEncuesta = data;
      console.log('Preguntas asociadas a la encuesta con id: ' + this.id);
      console.log(this.preguntasEncuesta);
    });
  }

}
