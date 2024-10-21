import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { CarritoService } from '../../carrito/services/carrito.service';
import { ProductosService } from '../../productos/services/productos.service';
import { Producto } from '../../productos/interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  editModal = new Subject<void>();
  formSubmitted = new Subject<void>();
  cargarCarta = new Subject<void>();
}
