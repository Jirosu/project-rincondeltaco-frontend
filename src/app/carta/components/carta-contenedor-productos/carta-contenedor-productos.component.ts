import { Component, Input, OnInit } from '@angular/core';
import { CategoriaProducto } from '../../../productos/interfaces/categoria-producto.interface';
import { Producto } from '../../../productos/interfaces/producto.interface';

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

  getProductosByCategoria(categoria: string) {
    console.log(this.productos.filter( prod => prod.ref_catProd.descCatProd === categoria));
    return this.productos.filter( prod => prod.ref_catProd.descCatProd === categoria);
  }

}
