import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../productos/services/productos.service';
import { Producto } from '../../../productos/interfaces/producto.interface';
import { CategoriaProducto } from '../../../productos/interfaces/categoria-producto.interface';

@Component({
  selector: 'carta-page',
  templateUrl: './carta-page.component.html',
  styleUrl: './carta-page.component.css'
})
export class CartaPageComponent implements OnInit{
  public allProducts: Producto[] = [];
  public allCategories: CategoriaProducto[] = [];

  constructor(private _prodService: ProductosService) { }

  ngOnInit() {
    this.getProductos();
    this.getCagetorias();
  }

  getProductos() {
    return this._prodService.getProductos().subscribe( respProds => {
      // this.allProducts = respProds.filter( prod => prod.ref_estProd.codEstProd === '01');
      this.allProducts = respProds.filter( prod => prod.enabled);
    });
  }

  getCagetorias() {
    return this._prodService.getCategorias().subscribe( respCats => {
      this.allCategories = respCats;
    });
  }

}
