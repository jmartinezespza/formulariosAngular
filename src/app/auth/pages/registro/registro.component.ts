import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import { noPuedeSerStrider, nombreApellidoPattern, emailPattern } from '../../../shared/validator/validaciones';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

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
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  }, {
    validators: [this.validatorService.camposIguales('password', 'password2')]
  });

  constructor( private fb: FormBuilder,
                private validatorService: ValidatorService,
                private emailValidator: EmailValidatorService ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: "Jhonny Martinez",
      email: "test1@test.com",
      username: "jmartinez",
      password: 123456,
      password2: 123456
    });
  }

  campoNoValido(campo: string) {
    
    return this.miFormulario.get( campo )?.invalid &&
          this.miFormulario.get(campo)?.touched;
  }

  emailRequired() {
    return this.miFormulario.get( "email" )?.errors?.required &&
          this.miFormulario.get("email")?.touched;
  }

  emailFormato() {
    return this.miFormulario.get( "email" )?.errors?.pattern &&
          this.miFormulario.get("email")?.touched;
  }

  emailTomado() {
    return this.miFormulario.get( "email" )?.errors?.emailTomado &&
          this.miFormulario.get("email")?.touched;
  }

  submitFormulario() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
    
  }

}
