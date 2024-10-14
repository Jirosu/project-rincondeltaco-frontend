import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EstadoProducto } from '../../interfaces/estado-producto.interface';
import { ResponseProducto } from '../../interfaces/response-producto.interface';
import { CategoriaProducto } from '../../interfaces/categoria-producto.interface';
import { Producto } from '../../interfaces/producto.interface';

import { MessageService } from 'primeng/api';
import { ProductosService } from '../../services/productos.service';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'productos-editar',
  templateUrl: './productos-editar.component.html',
  styleUrl: './productos-editar.component.css'
})
export class ProductosEditarComponent {
  codProd: string = '';

  @Input()
  public idProd: string = '';
  @Input()
  public categorias: CategoriaProducto[] = [];

  respuesta : ResponseProducto = {
    valor: false,
    msg: ''
  }

  visible: boolean = false;

  producto: Producto = {
    codProd: '',
    nomProd: '',
    descProd: '',
    precProd: 0,
    rutaImg: '',
    codCatProd: '',
    ref_catProd: {
      codCatProd: '',
      descCatProd: ''
    },
    enabled: true
  };

  constructor(private _prodService: ProductosService, private messageService: MessageService, private _sharedService: SharedService ) {}

  obtenerProd(){
    this._prodService.getProductos().subscribe(producto => {
      this.producto = producto.filter(prod => prod.codProd === this.idProd)[0];
    });
  }

  showDialog(condition: boolean) {
    this.visible = condition;
  }

  onSubmit() {
    let formData = new FormData();

    let rutaSplit = this.producto.rutaImg.split('/producto')
    this.producto.rutaImg = rutaSplit[1];

    this.producto.ref_catProd.descCatProd = this.categorias.find(cat => cat.codCatProd === this.producto.ref_catProd.codCatProd)?.descCatProd || '';
    this.producto.codCatProd = this.producto.ref_catProd.codCatProd;
    this.producto.enabled = this.producto.enabled;

    formData.append('data', JSON.stringify(this.producto));

    let data = formData.get('data');
    console.log(data);

   this._prodService.updateProducto(formData).subscribe(response => {
     this.respuesta = response;
     console.log(this.respuesta);
     this.showToast();
     this._sharedService.formSubmitted.next();
    });
    this.showDialog(false);
  }

  showToast(){
    if(this.respuesta.valor === true){
      this.showSuccess();
      return;
    }
    if(this.respuesta.valor === false){
      this.showError();
      return;
    }
  }

  showSuccess(){
    this.messageService.add({ severity: 'success', summary: 'Success', detail: this.respuesta.msg });
  }
  showError(){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: this.respuesta.msg });
  }

}
