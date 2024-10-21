import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import Pedido from '../../interfaces/pedido.interface';
import DetallePedido from '../../interfaces/detallePedido.interface';

@Component({
  selector: 'payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.css'
})
export class PaymentModalComponent{
  pedidoData: Pedido = {
    idUsuario: 0,
    direccionEntrega: '',
    distritoEntrega: '',
    telefonoEntrega: '',
  };
  carrito: DetallePedido[] = [];

  @Input()
  visible: boolean = false;
  @Input()
  subTotal: number = 0;
  @Input()
  total: number = 0;

  @Output()
  modalCloseEmmiter = new EventEmitter<boolean>();

  constructor(private messageService: MessageService) { }

  getCarritoStorage() {
    const data = sessionStorage.getItem('pedido');
    if(data) {
        this.carrito = JSON.parse(data);
    }
  }

  generarPago() {
    console.log('Pedido:', this.pedidoData);
    console.log('Carrito:', this.carrito);

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
