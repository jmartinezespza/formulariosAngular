import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import { noPuedeSerStrider, nombreApellidoPattern, emailPattern } from '../../../shared/validator/validaciones';
import { ValidatorService } from '../../../shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  noPuedeSerStrider(control: FormControl) {
    const valor = control.value?.trim().toLowerCase();
    if (valor === 'strider'){
      return {
        noStrider: true
      }
    }

    return null
    
  }

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider]]
  });

  constructor( private fb: FormBuilder,
                private validatorService: ValidatorService ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: "Jhonny Martinez",
      email: "jmartinezespza@gmail.com",
      username: "jmartinez"
    });
  }

  campoNoValido(campo: string) {
    
    return this.miFormulario.get( campo )?.invalid &&
          this.miFormulario.get(campo)?.touched;
  }

  submitFormulario() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
    
  }

}
