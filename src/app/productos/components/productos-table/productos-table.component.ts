import { Component, Input, OnInit, ViewChild, input } from '@angular/core';
import { Producto } from '../../interfaces/producto.interface';
import { ResponseProducto } from '../../interfaces/response-producto.interface';
import { ProductosService } from '../../services/productos.service';

import { SharedService } from '../../../shared/services/shared.service';

import { ConfirmationService, MessageService } from 'primeng/api';
import { EstadoProducto } from '../../interfaces/estado-producto.interface';
import { CategoriaProducto } from '../../interfaces/categoria-producto.interface';

@Component({
  selector: 'productos-table',
  templateUrl: './productos-table.component.html',
  styleUrl: './productos-table.component.css'
})
export class ProductosTableComponent implements OnInit{

  public productos: Producto[] = [];
  public loading: boolean = true;
  public id!: string;

  // estadosProd: EstadoProducto[] = [];
  categoriasProd: CategoriaProducto[] = [];

  private _respProd: ResponseProducto = {} as ResponseProducto;

  constructor(private _prodService: ProductosService, private _sharedService: SharedService, private confirmationService: ConfirmationService, private messageService: MessageService) {}

  get respProd(){
    return this._respProd;
  }

  ngOnInit() {
    this.loadProductos();
    // this.getEstados();

    this.getCategorias();
    this._sharedService.formSubmitted.subscribe(() => {
      this.loadProductos();
    });
  }

  loadProductos(): void {
    this._prodService.getProductos().subscribe((prods) => {
      this.productos = prods;
    });
  }

  // getEstados() {
  //   this._prodService.getEstados().subscribe(estados => {
  //     this.estadosProd = estados;
  //   });
  // }

  getCategorias() {
    this._prodService.getCategorias().subscribe(categorias => {
      this.categoriasProd = categorias;
    });
  }

  deleteProduct(id: string): void{
    this._prodService.deleteProducto(id).subscribe( (resp) => {
      this._respProd = resp;
      this.loadProductos();
    });
  }

  getSeverity(status: boolean) {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'warning';
      default:
        return 'info';
    }
  }

  obtenerCodProd(id: string) {
    this.id = id;
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Seguro que desea eliminar el producto?',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      accept: () => {
        this.deleteProduct(this.id);
        this.messageService.add({ severity: 'info', summary: 'Producto eliminado', detail: `El producto con  ID: ${this.id} ha sido eliminado.` });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Acción Cancelada', detail: 'Eliminación cancelada.' });
      }
    });
  }

  openModalEdit() {
    console.log('UNO');
    this._sharedService.editModal.next();
  }
}
