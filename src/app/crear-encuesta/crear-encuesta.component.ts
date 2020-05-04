import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncuestasService } from './../services/encuestas.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crear-encuesta',
  templateUrl: './crear-encuesta.component.html',
  styleUrls: ['./crear-encuesta.component.scss']
})
export class CrearEncuestaComponent implements OnInit {

  // GRUPO DE CONTROLES PARA LOS FORMULARIOS
  formEncuesta: FormGroup;
  formPreguntas: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private encuestasService: EncuestasService) {

    this.buildForm();
  }

  ngOnInit() {
    this.encuestas();
  }

  // GUARDA LOS DATOS GENERALES DE LA ENCUESTA
  guardarNombreEncuesta(event: Event) {

    event.preventDefault();
    console.log(this.formEncuesta.value);

    if (this.formEncuesta.valid) {

      this.encuestasService.crearEncuesta(this.formEncuesta.value)
      .subscribe(
        encuesta => {
          console.log(encuesta);
          environment.id_encuesta = encuesta;
        });
      console.log('Los datos generales de la encuesta han sido guardados');
    }
  }

  // GUARDA LA PREGUNTA ASOCIADA A LA ENCUESTA
  guardarPregunta(event: Event) {

    event.preventDefault();
    console.log(this.formPreguntas.value);

    // VALIDACION DEL FORMULARIO PARA GUARDAR DATOS
    if(this.formPreguntas.valid) {

      console.log('La pregunta ha sido asociada a la encuesta con id ' + environment.id_encuesta);
    }
  }

  encuestas() {

    this.encuestasService.obtenerEncuestas().subscribe(
      data => {
        console.log(data);
      }
    );
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
      multiple: [false]
    });

  }

}
