import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    condiciones: [false, Validators.requiredTrue]
  });

  persona = {
    genero: 'F',
    notificaciones: true
  }

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {

    // this.miFormulario.reset(this.persona);
    this.miFormulario.reset({
      ...this.persona,
      condiciones: true
    });

    // para sincronizar os valores del formulario con el objeto interno de guardar

    // this.miFormulario.get('condiciones')?.valueChanges.subscribe(newValue => {
    //   console.log(newValue);
      
    // })

    // this.miFormulario.valueChanges.subscribe(form => {
    //   delete form.condiciones;
    //   this.persona = form;
    // })

    // similar a la anterior, usando desestructuracion. quita condiciones y el resto lo guarda en rest
    this.miFormulario.valueChanges.subscribe(({condiciones, ...rest}) => {
        this.persona = rest;
      })

  }

  guardar() {
    const formValue = {...this.miFormulario.value};
    delete formValue.condiciones;
    console.log(formValue);

    this.persona = formValue;
    
  }

}
