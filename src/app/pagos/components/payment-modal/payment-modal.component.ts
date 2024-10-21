import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import Pedido from '../../interfaces/pedido.interface';
import DetallePedido from '../../interfaces/detallePedido.interface';
import PedidoRequest from '../../interfaces/pedidoRequest.interface';

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

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {

  }

  getCarritoStorage() {
    const data = sessionStorage.getItem('pedido');
    if(data) {
      this.pedidoRequest.listaProductos = JSON.parse(data);
    }
  }

  generarPago() {
    console.log(this.pedidoRequest);

    this.showPaymentSuccess();
    this.modalClose();
  }

  showPaymentSuccess() {
    let count = 0;
    count++;
    this.messageService.add({ id: count, life: 2000, key:'paymentToast', severity: 'success', summary: 'Pago Exitoso!', detail: `Muchas gracias por su compra!` });
  }

  modalClose(){
    this.modalCloseEmmiter.emit(this.visible);
  }
}
