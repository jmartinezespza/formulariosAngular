import { Component, OnInit } from '@angular/core';

interface Persona {
  nombre: string,
  favorito: Favorito[];
}

interface Favorito {
  id: number,
  nombre: string
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  persona: Persona = {
    nombre: 'Jhonny',
    favorito: [
      { id: 1, nombre: 'Metal Gear'},
      { id: 2, nombre: 'DeathStranidng'}
    ]
  }

  nuevoJuego: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  guardar() {
    console.log('formulario posteado');
    
  }

  eliminar(index: number ) {
    this.persona.favorito.splice(index, 1);
    
  }

  agregarJuego() {
    const nuevoFavorito: Favorito = {
      id: this.persona.favorito.length +1,
      nombre: this.nuevoJuego
    }

    this.persona.favorito.push({...nuevoFavorito});
    this.nuevoJuego = '';
  }

}
