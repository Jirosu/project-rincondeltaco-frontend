import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';

@NgModule({
  declarations: [
    PaymentModalComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    DialogModule
  ],
  exports: [
    PaymentModalComponent
  ]
})
export class PagosModule { }
