import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { CarritoService } from '../../carrito/services/carrito.service';
import { ProductosService } from '../../productos/services/productos.service';
import { Producto } from '../../productos/interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  productos: Producto[] = [];

  editModal = new Subject<void>();
  formSubmitted = new Subject<void>();
  cargarCarta = new Subject<void>();

  constructor(private _carritoService: CarritoService, private _prodService: ProductosService) { }

  getSubtotal() :number {
    let subtotalPedido: number = 0;

    this._prodService.getProductos().subscribe( respProds => {
      this.productos = respProds.filter( prod => prod.enabled);
    });

    this._carritoService.carritoCompra.forEach( (prod) => {
      subtotalPedido += prod.cantidad * (this.productos.find( prodFinded => prodFinded.codProd === prod.idProd)?.precProd || 0);
    });
    return subtotalPedido;
  }
}
