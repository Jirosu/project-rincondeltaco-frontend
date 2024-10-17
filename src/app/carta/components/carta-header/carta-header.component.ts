import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'carta-header',
  templateUrl: './carta-header.component.html',
  styleUrl: './carta-header.component.css'
})
export class CartaHeaderComponent implements OnInit{
  valor: boolean = false;

  constructor(private _router: Router) { }

  ngOnInit() {
    if(sessionStorage.getItem('valor') == null) {
      this.valor = false;
      this._router.navigate(['/login']);
    } else {
      this.valor = true;
    }
  }

  login() {

  }

  cerrarSesion() {
    sessionStorage.removeItem('valor');
    sessionStorage.removeItem('nombre');
    sessionStorage.removeItem('rol');

    console.log('Sesión cerrada');
    this.valor = false;
    this._router.navigate(['/login']);
  }
}
