import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../login/services/login.service';


@Component({
  selector: 'productos-page',
  templateUrl: './productos-page.component.html',
  styleUrl: './productos-page.component.css'
})
export class ProductosPageComponent implements OnInit {

  constructor( private _loginSev: LoginService) { }

  ngOnInit() {
    this._loginSev.validateRol('Administrador');
  }
}