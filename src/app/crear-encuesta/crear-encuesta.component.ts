import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncuestasService } from './../services/encuestas.service';
import { PreguntasService } from './../services/preguntas.service';
import { environment } from 'src/environments/environment';
import { Preguntas } from './../interfaces/preguntas';

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

  constructor(private formBuilder: FormBuilder,
              private encuestasService: EncuestasService,
              private preguntasService: PreguntasService
    ) {

    this.buildForm();
  }

  ngOnInit() {}

  // GUARDA LOS DATOS GENERALES DE LA ENCUESTA
  guardarNombreEncuesta(event: Event) {

    event.preventDefault();
    console.log(this.formEncuesta.value);

    if (this.formEncuesta.valid) {

      this.encuestasService.crearEncuesta(this.formEncuesta.value)
      .subscribe(
        encuesta => {
          console.log(encuesta);
          this.idEncuesta = encuesta;
        });
      console.log('Los datos generales de la encuesta han sido guardados');
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

  // MUESTRA EL LISTADO DE PREGUNTAS
  preguntas() {

    this.preguntasService.obtenerPreguntas(this.idEncuesta)
    .subscribe((data: Preguntas[]) => {

      this.pregunta = data;
      console.log('Pregunta registrada');
      console.log(this.pregunta);
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
      encuesta_id: 0
    });

  }

}
