import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interface/usuario.interface';
import { ResponseUsuario } from '../interface/response-usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private readonly _apiUrl = 'http://localhost:8083';

  constructor(private _http: HttpClient) { }

  getUsuarios(){
    const url = `${this._apiUrl}/usuario/listar`;
    return this._http.get<Usuario[]>(url);
  }

  createUsuario(usuario: Usuario){
    const url = `${this._apiUrl}/usuario/guardar`;
    return this._http.post<ResponseUsuario>(url, usuario);
  }

  updateUsuario(usuario: Usuario){
    const url = `${this._apiUrl}/usuario/editar`;
    return this._http.put<ResponseUsuario>(url, usuario);
  }

  deleteUsuario(id: string){
    const url = `${this._apiUrl}/usuario/eliminar/${id}`;
    return this._http.delete<ResponseUsuario>(url);
  }
}
