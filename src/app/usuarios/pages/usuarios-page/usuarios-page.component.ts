import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../login/services/login.service';

@Component({
  selector: 'usuarios-page',
  templateUrl: './usuarios-page.component.html',
  styleUrl: './usuarios-page.component.css'
})
export class UsuariosPageComponent implements OnInit {

  constructor(private _loginSev: LoginService) { }

  ngOnInit() {
    this._loginSev.validateRol('Administrador');
  }
}
