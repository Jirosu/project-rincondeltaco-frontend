import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import Pedido from '../../interfaces/pedido.interface';
import DetallePedido from '../../interfaces/detallePedido.interface';
import PedidoRequest from '../../interfaces/pedidoRequest.interface';
import { PagosService } from '../../services/pagos.service';
import { CarritoService } from '../../../carrito/services/carrito.service';

@Component({
  selector: 'payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.css'
})
export class PaymentModalComponent implements OnInit{

  pedidoRequest: PedidoRequest = {
    datosPedido: {
      idUsuario: 0,
      distritoEntrega: '',
      direccionEntrega: '',
      telefonoEntrega: ''
    },
    datosVoucher: {
      document_type_Cli: '',
      num_document_Cli: '',
      voucher_type: ''
    },
    listaProductos: []
  }

  @Input()
  visible: boolean = false;
  @Input()
  subTotal: number = 0;
  @Input()
  total: number = 0;

  @Output()
  modalCloseEmmiter = new EventEmitter<boolean>();

  get visibilityModal() {
    this.getCarritoStorage();
    this.getUserIdStorage();
    return this.visible;
  }

  set visibilityModal(value: boolean) {
    this.getCarritoStorage();
    this.getUserIdStorage();
    this.visible = value;
  }

  constructor(private messageService: MessageService, private _pagosServive: PagosService,
    private _carritoService: CarritoService) { }

  ngOnInit(): void {
    this.getCarritoStorage();
    this.getUserIdStorage();
  }

  getCarritoStorage() {
    const data = sessionStorage.getItem('pedido');
    if(data) {
      this.pedidoRequest.listaProductos = JSON.parse(data);
    }
  }

  getUserIdStorage() {
    const data = sessionStorage.getItem('id');
    if(data) {
      this.pedidoRequest.datosPedido.idUsuario = parseInt(data);
    }
  }

  generarPago() {     
    this._pagosServive.generarPago(this.pedidoRequest).subscribe({
      next: () => {
        this.showPaymentSuccess();
        this.modalClose(false);
        this._carritoService.deleteCarrito();
        this.pedidoRequest = {
          datosPedido: {
            idUsuario: 0,
            distritoEntrega: '',
            direccionEntrega: '',
            telefonoEntrega: ''
          },
          datosVoucher: {
            document_type_Cli: '',
            num_document_Cli: '',
            voucher_type: ''
          },
          listaProductos: []
        }
    }, error: (error) => {
        console.error(error);
    }});
  }

  showPaymentSuccess() {
    let count = 0;
    count++;
    this.messageService.add({ id: count, life: 2000, key:'paymentToast', severity: 'success', summary: 'Pago Exitoso!', detail: `Muchas gracias por su compra!` });
  }

  modalClose(value: boolean){
    this.modalCloseEmmiter.emit(value);
  }
}
