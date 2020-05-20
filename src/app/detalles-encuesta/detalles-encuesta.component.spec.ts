import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesEncuestaComponent } from './detalles-encuesta.component';

describe('DetallesEncuestaComponent', () => {
  let component: DetallesEncuestaComponent;
  let fixture: ComponentFixture<DetallesEncuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesEncuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
