import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { MessageService } from 'primeng/api';
import { ProductosService } from '../../services/productos.service';
import { SharedService } from '../../../shared/services/shared.service';

import { CategoriaProducto } from '../../interfaces/categoria-producto.interface';
import { ResponseProducto } from '../../interfaces/response-producto.interface';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'productos-crear',
  templateUrl: './productos-crear.component.html',
  styleUrl: './productos-crear.component.css',
})
export class ProductosFormComponent implements OnInit{
  @ViewChild('imageFile')
  imageFile!: ElementRef;

  respuesta : ResponseProducto = {
    valor: false,
    msg: ''
  }

  producto: Producto = {
    codProd: 0,
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

  public categorias: CategoriaProducto[] = [];

  visible: boolean = false;

  constructor(private _prodService: ProductosService, private _sharedService: SharedService, private messageService: MessageService) {}

  ngOnInit() {
    this.getCategorias();
  }

  getCategorias() {
    this._prodService.getCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });
  }

  onSubmit() {
    let formData = new FormData();
    formData.append('image', this.imageFile.nativeElement.files[0]);
    this.producto.rutaImg = this.imageFile.nativeElement.files[0].name;

    this.producto.ref_catProd.descCatProd = this.categorias.find(cat => cat.codCatProd === this.producto.ref_catProd.codCatProd)?.descCatProd || '';
    this.producto.codCatProd = this.producto.ref_catProd.codCatProd;
    this.producto.enabled = this.producto.enabled;

    formData.append('data', JSON.stringify(this.producto));

    let data1 = formData.get('image');
    console.log(data1);
    let data2 = formData.get('data');
    console.log(data2);

    this._prodService.createProducto(formData).subscribe(response => {
      this.respuesta = response;
      this.showToast();
      this._sharedService.formSubmitted.next();
    });

    this.showDialog(false);
    this.producto = {
      codProd: 0,
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
  }

  showDialog(condition: boolean) {
    this.visible = condition;
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

  showError(){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: this.respuesta.msg });
  }

  showSuccess(){
    this.messageService.add({ severity: 'success', summary: 'Producto Registrado!', detail: this.respuesta.msg });
  }
}
