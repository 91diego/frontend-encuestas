import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { empleado } from './../../environments/environment';

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
  // ID DE LA PREGUNTA
  idPregunta;
  // INTERFACES PARA TRAER LOS DATOS DE LA API
  encuestaDetalle: Encuestas[];
  preguntasEncuesta: Preguntas[];
  detallesPregunta: Preguntas[];
  mediciones: Mediciones[];

  // FORMULARIO PARA EDITAR PREGUNTA
  formEditarPregunta: FormGroup;
  // FORMULARIO PARA AGREGAR PREGUNTA
  formAgregar: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private encuestasService: EncuestasService,
              private preguntasService: PreguntasService,
              private medicionesService: MedicionesService) {

                this.buildForm();

                // DETECTAMOS EL CAMBIO EN EL SELECT NOPREGUNTA
                // PARA EJECUTAR LA FUNCION QUE OBTIENE EL DETALLE
                // DE CADA PREGUNTA
                this.formEditarPregunta.get('noPregunta').valueChanges
                .subscribe(value => {
                  console.log(value);
                  this.idPregunta = value;
                  console.log('ID Pregunta: ' + this.idPregunta);
                  this.detallePregunta(value);
                });
              }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.encuesta(this.id);
    this.preguntas(this.id);
    console.log(empleado.empleadoId);
  }

  // GUARDA LA PREGUNTA ASOCIADA A LA ENCUESTA
  editarPregunta(event: Event) {

    event.preventDefault();
    console.log(this.formEditarPregunta.value);
    this.idPregunta = this.formEditarPregunta.get('noPregunta').value;
    // this.formEditar.get('idPreguta').setValue(this.id);

    // VALIDACION DEL FORMULARIO PARA GUARDAR DATOS
    if (this.formEditarPregunta.valid) {

      this.preguntasService.editarPregunta(this.idPregunta, this.formEditarPregunta.value)
      .subscribe(pregunta => {
        console.log(pregunta);
        // REFRESCA EL LISTADO DE LAS PREGUNTAS
        this.preguntas(this.id);
        this.reiniciarFormEditar();
        this.formEditarPregunta.get('noPregunta').valueChanges
        .subscribe(value => {
          console.log(value);
          this.idPregunta = value;
          console.log('ID Pregunta: ' + this.idPregunta);
          this.detallePregunta(value);
        });
      });
    }
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

  // MUESTRA EL DETALLE DE CADA PREGUNTA ENVIANDO COMO PARAMETRO EL ID
  detallePregunta(id: any) {

    this.preguntasService.detallePregunta(id)
    .subscribe((data: Preguntas[]) => {

      this.detallesPregunta = data;
      console.log('Detalle de la pregunta con id: ' + this.id);
      console.log(this.detallesPregunta);
    })
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

  // RESETEA EL VALOR DEL FORMULARIO PARA LAS PREGUNTAS
  private reiniciarFormEditar() {

    this.formEditarPregunta = this.formBuilder.group({

      noPregunta: [1, [Validators.required]],
      pregunta: ['', [Validators.required]],
      multiple: ['', [Validators.required]],
      medicion: ['', [Validators.required]],
    });
  }

  // CREA EL GRUPO DE CONTROLES PARA LOS FORMULARIOS
  private buildForm() {

    this.formAgregar = this.formBuilder.group({

      pregunta: ['', [Validators.required]],
      multiple: [false],
      medicion: ['', [Validators.required]],
      encuesta_id: 0
    });

    this.formEditarPregunta = this.formBuilder.group({

      noPregunta: ['', [Validators.required]],
      pregunta: ['', [Validators.required]],
      multiple: ['', [Validators.required]],
      medicion: ['', [Validators.required]],
    });

  }

}
