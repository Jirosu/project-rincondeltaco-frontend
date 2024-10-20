import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.css'
})
export class PaymentModalComponent implements OnInit{
  @Input()
  visible: boolean = false;
  subTotal: number = 0;

  constructor(private messageService: MessageService, private _sharedService: SharedService) { }

  ngOnInit() {
    this.subTotal = this._sharedService.getSubtotal();
  }

  showPaymentSuccess(name: string){
    let count = 0;
    count++;
    this.messageService.add({ id: count, life: 2000, key:'paymentToast', severity: 'success', summary: 'Pago Exitoso!', detail: `Muchas gracias por su compra!` });
  }
}
