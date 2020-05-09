import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncuestasService } from './../services/encuestas.service';
import { PreguntasService } from './../services/preguntas.service';
import { FasesService } from './../services/fases.service';
import { MedicionesService } from './../services/mediciones.service';
import { environment } from 'src/environments/environment';
import { Preguntas } from './../interfaces/preguntas';
import { Fases } from '../interfaces/fases';
import { Mediciones } from '../interfaces/mediciones';

@Component({
  selector: 'app-crear-encuesta',
  templateUrl: './crear-encuesta.component.html',
  styleUrls: ['./crear-encuesta.component.scss']
})
export class CrearEncuestaComponent implements OnInit {

  // GRUPO DE CONTROLES PARA LOS FORMULARIOS
  formEncuesta: FormGroup;
  formPreguntas: FormGroup;
  // ID DE LA ENCUESTA CREADA
  idEncuesta;
  pregunta: Preguntas[];
  nombreFases: Fases[];
  nombreMediciones: Mediciones[];

  constructor(private formBuilder: FormBuilder,
              private encuestasService: EncuestasService,
              private preguntasService: PreguntasService,
              private fasesService: FasesService,
              private medicionesServices: MedicionesService
    ) {
      // INICIALIZAMOS LOS FORMULARIOS DE LA FUNCION
      this.buildForm();
      console.log(this.formEncuesta.get('fase').value);

      // DETECTAMOS EL CAMBIO EN EL SELECT FASE
      // EL CUAL DISPARARA LA FUNCION QUE CAMBIA
      // LAS OPCIONES DE LA MEDICION AL CREAR LA PREGUNTA
      this.formEncuesta.get('fase').valueChanges
      .subscribe(value => {
        this.cambioFase(value);
      });

      // DESHABILITAMOS EL FORMULARIO PREGUNTAS
      this.formPreguntas.disable();
  }

  ngOnInit() {

    this.fases();
  }

  // GUARDA LOS DATOS GENERALES DE LA ENCUESTA
  guardarNombreEncuesta(event: Event) {

    event.preventDefault();

    if (this.formEncuesta.valid) {

      this.encuestasService.crearEncuesta(this.formEncuesta.value)
      .subscribe(
        encuesta => {
          console.log(encuesta);
          this.idEncuesta = encuesta;
          this.formPreguntas.enable();
          this.formEncuesta.disable();
          console.log('Los datos generales de la encuesta han sido guardados');
        }
      );
    }
  }

  // GUARDA LA PREGUNTA ASOCIADA A LA ENCUESTA
  guardarPregunta(event: Event) {

    event.preventDefault();
    // ASIGNAMOS EL VALOR DE LA ENCUESTA
    this.formPreguntas.get('encuesta_id').setValue(this.idEncuesta);
    console.log(this.formPreguntas.value);

    // VALIDACION DEL FORMULARIO PARA GUARDAR DATOS
    if(this.formPreguntas.valid) {

      this.preguntasService.crearPreguntas(this.formPreguntas.value)
      .subscribe(pregunta => {
        console.log(pregunta);
        this.preguntas();
      });
      console.log('La pregunta ha sido asociada a la encuesta con id ' + this.idEncuesta);
    }
  }

  // MUESTRA EL LISTADO DE LAS ENCUESTAS
  encuestas() {

    this.encuestasService.obtenerEncuestas().subscribe(
      data => {
        console.log(data);
      }
    );
  }

  // MUESTRA EL LISTADO DE LAS FASES DISPONIBLES
  fases() {

    this.fasesService.obtenerfases()
    .subscribe((data: Fases[]) => {

      this.nombreFases = data;
      console.log('Fases');
      console.log(this.nombreFases);
    });
  }

  // MUESTRA EL LISTADO DE PREGUNTAS
  preguntas() {

    this.preguntasService.obtenerPreguntas(this.idEncuesta)
    .subscribe((data: Preguntas[]) => {

      this.pregunta = data;
      console.log('Pregunta registrada');
      console.log(this.pregunta);
    });
    this.reiniciarFormPreguntas();
  }

  // DETECTA EL CAMBIO DE LA FASE
  cambioFase(id: any) {

    console.log(id);
    this.medicionesServices.obtenerMediciones(id)
    .subscribe((data: Mediciones[]) => {

      this.nombreMediciones = data;
      console.log('Mediciones asociadas a la fase');
      console.log(this.nombreMediciones);
    });
  }

  // CREA EL GRUPO DE CONTROLES PARA LOS FORMULARIOS
  private buildForm() {

    this.formEncuesta = this.formBuilder.group({

      encuesta: ['', [Validators.required]],
      desarrollo: ['', [Validators.required]],
      fase: ['', [Validators.required]]
    });

    this.formPreguntas = this.formBuilder.group({

      pregunta: ['', [Validators.required]],
      multiple: [false],
      medicion: ['', [Validators.required]],
      encuesta_id: 0
    });

  }

  // RESETEA EL VALOR DEL FORMULARIO PARA LAS PREGUNTAS
  private reiniciarFormPreguntas() {

    this.formPreguntas = this.formBuilder.group({

      pregunta: ['', [Validators.required]],
      multiple: [false],
      medicion: ['', [Validators.required]],
      encuesta_id: this.idEncuesta
    });
  }

}
