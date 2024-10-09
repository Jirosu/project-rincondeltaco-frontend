import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
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

  cerrarSesion() {
    sessionStorage.removeItem('valor');
    sessionStorage.removeItem('nombre');

    console.log('Sesión cerrada');
    this.valor = false;
    this._router.navigate(['/login']);
  }

}
