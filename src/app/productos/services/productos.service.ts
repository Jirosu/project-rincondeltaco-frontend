import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { map } from 'rxjs';
import { ResponseProducto } from '../interfaces/response-producto.interface';
import { CategoriaProducto } from '../interfaces/categoria-producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private readonly _apiUrl = 'http://localhost:8082';

  constructor(private _http: HttpClient) { }

  getProductos() {
    const url = `${this._apiUrl}/producto/listar`;
    return this._http.get<Producto[]>(url).pipe(
      /*
        Del array de productos que se obtiene del Observable
        vamos a aplicar un map para transformar cada producto,
        para cada producto en el array, crea un nuevo objeto que es una copia
        del producto original, pero con rutaImg reemplazado por la nueva url.
        Finalmente se devuelve un Observable de este nuevo array de productos.
      */
      map((productos: Producto[]) => {
        return productos.map((producto: Producto) => {
          const nuevaRutaImg = `/producto${producto.rutaImg}`;
          return {
            ...producto,
            rutaImg: `${this._apiUrl}${nuevaRutaImg}`
          };
        });
      })
    );
  }

  getCategorias() {
    const url = `${this._apiUrl}/categoria/listar`;
    return this._http.get<CategoriaProducto[]>(url);
  }

  createProducto(form: FormData) {
    const url = `${this._apiUrl}/producto/guardar`;
    return this._http.post<ResponseProducto>(url, form);
  }

  updateProducto(form: FormData) {
    const url = `${this._apiUrl}/producto/editar`;
    return this._http.put<ResponseProducto>(url, form);
  }

  deleteProducto(id: string) {
    const url = `${this._apiUrl}/producto/eliminar/${id}`;
    return this._http.delete<ResponseProducto>(url);
  }

}
