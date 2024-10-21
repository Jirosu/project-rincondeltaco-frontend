import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PedidoRequest from '../interfaces/pedidoRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private readonly _apiUrl = 'http://localhost:8084';

  constructor(private _http: HttpClient) { }

  pagar(pedidoRequest : PedidoRequest){
    return this._http.post(`${this._apiUrl}/pedido/crear`, {pedidoRequest});
  }

}
