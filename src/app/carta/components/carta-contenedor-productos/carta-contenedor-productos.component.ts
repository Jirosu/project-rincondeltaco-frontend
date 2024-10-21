import { Component, Input, OnInit } from '@angular/core';
import { CategoriaProducto } from '../../../productos/interfaces/categoria-producto.interface';
import { Producto } from '../../../productos/interfaces/producto.interface';
import { CarritoService } from '../../../carrito/services/carrito.service';
import { MessageService } from 'primeng/api';
import { count } from 'rxjs';

@Component({
  selector: 'carta-contenedor-productos',
  templateUrl: './carta-contenedor-productos.component.html',
  styleUrl: './carta-contenedor-productos.component.css'
})
export class CartaContenedorProductosComponent {
  @Input()
  productos: Producto[] = [];
  @Input()
  categorias: CategoriaProducto[] = [];

  constructor(private _carritoService: CarritoService, private messageService: MessageService) { }

  getProductosByCategoria(categoria: string) {
    return this.productos.filter( prod => prod.ref_catProd.descCatProd === categoria);
  }

  getProductName(id: number) : string {
    const prod = this.productos.find( (prod) => prod.codProd === id );
    return prod!.nomProd;
  }

  addProductToCart(id: number) {
    this._carritoService.addProduct({
      idProduct: id,
      cantidad: 1
    });

    this.showSuccess(this.getProductName(id));
  }

  showSuccess(name: string){
    let count = 0;
    count++;
    this.messageService.add({ id: count, life: 2000, key:'cartToast', severity: 'success', summary: 'Producto agregado!', detail: `Se agregó el producto ${name}` });
  }

}
