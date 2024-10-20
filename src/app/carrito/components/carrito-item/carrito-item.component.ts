import { Component, Input } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../../productos/interfaces/producto.interface';
import { ProductoCarrito } from '../../interfaces/producto-carrito.interface';

@Component({
  selector: 'carrito-item',
  templateUrl: './carrito-item.component.html',
  styleUrl: './carrito-item.component.css'
})
export class CarritoItemComponent {

  @Input()
  producto: Producto = {} as Producto;
  @Input()
  productoCarrito: ProductoCarrito = {} as ProductoCarrito;

  constructor(private _carritoService: CarritoService) {}

  increaseQuantity() {
    this._carritoService.increaseQuantity(this.productoCarrito);
  }

  reduceQuantity() {
    if(this.productoCarrito.cantidad <= 1){
      return;
    }
    this._carritoService.reduceQuantity(this.productoCarrito);
  }

  deleteProdCarrito() {
    this._carritoService.deleteProdCarrito(this.productoCarrito);
  }

}
