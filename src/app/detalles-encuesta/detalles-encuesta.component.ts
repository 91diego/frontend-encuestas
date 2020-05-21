import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PreguntasService } from './../services/preguntas.service';
import { EncuestasService } from './../services/encuestas.service';
import { MedicionesService } from './../services/mediciones.service';

import { Preguntas } from './../interfaces/preguntas';
import { Encuestas } from '../interfaces/encuestas';
import { Mediciones } from '../interfaces/mediciones';

@Component({
  selector: 'app-detalles-encuesta',
  templateUrl: './detalles-encuesta.component.html',
  styleUrls: ['./detalles-encuesta.component.scss']
})
export class DetallesEncuestaComponent implements OnInit {

  // GUARDA EL ID PASADO POR PARAMETRO EN LA URL
  id;
  // GUARDA EL ID DE LA FASE CORRESPONDIENTE A LA ENCUESTA
  idFase;
  // GUARDA EL NOMBRE DE LA ENCUESTA
  nombreEncuesta;
  // INTERFACES PARA TRAER LOS DATOS DE LA API
  encuestaDetalle: Encuestas[];
  preguntasEncuesta: Preguntas[];
  mediciones: Mediciones[];

  // FORMULARIO PARA EDITAR LA DESCRIPCION DE LA PREGUNTA
  formEditarDescripcion: FormGroup;
  // FORMULARIO PARA EDITAR LA OPCION MULTIPLE DE LA PREGUNTA
  formEditarMultiple: FormGroup;
  // FORMULARIO PARA EDITAR LA MEDICION DE LA PREGUNTA
  formEditarMedicion: FormGroup;
  // FORMULARIO PARA AGREGAR PREGUNTA
  formAgregar: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private encuestasService: EncuestasService,
              private preguntasService: PreguntasService,
              private medicionesService: MedicionesService) {

                this.buildForm();
              }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.encuesta(this.id);
    this.preguntas(this.id);
  }

  // GUARDA LA PREGUNTA ASOCIADA A LA ENCUESTA
  cambiar(event: Event) {

    event.preventDefault();
    console.log(this.formEditarDescripcion.value);
  }

  // GUARDA LA PREGUNTA ASOCIADA A LA ENCUESTA
  guardarPregunta(event: Event) {

    event.preventDefault();
    console.log(this.formAgregar.value);
    this.formAgregar.get('encuesta_id').setValue(this.id);

    // VALIDACION DEL FORMULARIO PARA GUARDAR DATOS
    if (this.formAgregar.valid) {

      this.preguntasService.crearPreguntas(this.formAgregar.value)
      .subscribe(pregunta => {
        console.log(pregunta);
        // REFRESCA EL LISTADO DE LAS PREGUNTAS
        this.preguntas(this.id);
      });
      console.log('La pregunta ha sido asociada a la encuesta con id ' + this.id);
    }
  }

  // MUESTRA LA ENCUESTA DE ACUERDO AL ID
  encuesta(id: any) {
    this.encuestasService.detalleEncuesta(id)
    .subscribe((data: Encuestas[]) => {

      this.encuestaDetalle = data;
      console.log('Detalle de la encuesta con id: ' + this.id);
      console.log(this.encuestaDetalle);
      this.idFase = this.encuestaDetalle['idFase'];
      this.nombreEncuesta = this.encuestaDetalle['encuesta'];
      this.obtenerMeidiciones(this.idFase);
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
    // REINICIA LOS VALORES DEL FORMULARIO
    this.reiniciarFormPreguntas();
  }

  // DETECTA EL CAMBIO DE LA FASE
  obtenerMeidiciones(id: any) {

    console.log(id);
    this.medicionesService.obtenerMediciones(id)
    .subscribe((data: Mediciones[]) => {

      this.mediciones = data;
      console.log('Mediciones asociadas a la fase ' + id);
      console.log(this.mediciones);
    });
  }

  // RESETEA EL VALOR DEL FORMULARIO PARA LAS PREGUNTAS
  private reiniciarFormPreguntas() {

    this.formAgregar = this.formBuilder.group({

      pregunta: ['', [Validators.required]],
      multiple: [false],
      medicion: ['', [Validators.required]],
      encuesta_id: 0
    });
  }

  // CREA EL GRUPO DE CONTROLES PARA LOS FORMULARIOS
  private buildForm() {

    this.formEditarDescripcion = this.formBuilder.group({

      descripcion: [[Validators.required]],
      idPregunta: [[Validators.required]]
    });

    this.formEditarMultiple = this.formBuilder.group({

      multipleOpcion: [[Validators.required]],
      idPregunta: [[Validators.required]]
    });

    this.formAgregar = this.formBuilder.group({

      pregunta: ['', [Validators.required]],
      multiple: [false],
      medicion: ['', [Validators.required]],
      encuesta_id: 0
    });

  }

}
