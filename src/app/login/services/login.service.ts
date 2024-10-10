import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseUsuario } from '../../usuarios/interface/response-usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly _apiUrl = 'http://localhost:8083';

  constructor(private _http: HttpClient) { }

  loginUsuarios(form: FormData) {
    const url = `${this._apiUrl}/usuario/login`;
    return this._http.post<ResponseUsuario>(url, form);
  }
}
