import { Component, Input } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../../productos/interfaces/producto.interface';
import { LoginService } from '../../../login/services/login.service';
import { Router } from '@angular/router';
  
@Component({
  selector: 'carrito-sidebar',
  templateUrl: './carrito-sidebar.component.html',
  styleUrl: './carrito-sidebar.component.css'
})
export class CarritoSidebarComponent {

  @Input()
  productos: Producto[] = [];

  cartVisibility: boolean = false;

  constructor(private _carritoService: CarritoService, private _loginService: LoginService, 
    private _router: Router) { }

  get carritoProductos() {
    return this._carritoService.carritoCompra;
  }
  
  changeCartVisibility() : void {
    this.cartVisibility = !this.cartVisibility;   
  }

  getProductoById(id: number) : Producto {    
    return this.productos.find( prod => prod.codProd === id) || {} as Producto;
  }

  getSubtotal() :number {
    let subtotalPedido: number = 0;
    this.carritoProductos.forEach( (prod) => {
      subtotalPedido += prod.cantidad * this.getProductoById(prod.idProd).precProd;
    });
    return subtotalPedido;
  }

  getTotal() :number {    
    return this.getSubtotal() + 15;
  }

  validateLoginCarrito() {
    return this._loginService.validateLoginBoolean() && this.carritoProductos.length > 0;    
  }

  goToPagoPage() {
    if(this.validateLoginCarrito()) {
      console.log("esta logueado ir a pago"); 
      this._router.navigateByUrl('/'); //AGREGAR LINK DE PAGO PAGE
    }
    
  }

}
