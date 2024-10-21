import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseUsuario } from '../../usuarios/interface/response-usuario.interface';
import { Router } from '@angular/router';
import { Login } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly _apiUrl = 'http://localhost:8083';

  constructor(private _http: HttpClient, private _router: Router) { }

  // loginUsuarios(form: FormData) {
  loginUsuarios(loginData: Login) {
    const url = `${this._apiUrl}/usuario/login`;
    return this._http.post<ResponseUsuario>(url, loginData);
  }

  validateLogin() : boolean {
    if(sessionStorage.getItem('valor') == null || sessionStorage.getItem('nombre') == null || sessionStorage.getItem('rol')  == null) {
      this._router.navigate(['/carta']);
      return false;
    }
    return true;
  }

  validateLoginBoolean() : boolean {
    if(sessionStorage.getItem('valor') == null || sessionStorage.getItem('nombre') == null || sessionStorage.getItem('rol')  == null) {
      return false;
    }
    return true;
  }

  validateRol(rol: string) {
    if(sessionStorage.getItem('rol') != rol) {
      this._router.navigate(['/carta']);
    }
  }

  getUserRol() : string {
    return sessionStorage.getItem('rol') || '';
  }
}
