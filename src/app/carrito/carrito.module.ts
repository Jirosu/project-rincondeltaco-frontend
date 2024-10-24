import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarritoSidebarComponent } from './components/carrito-sidebar/carrito-sidebar.component';

import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CarritoItemComponent } from './components/carrito-item/carrito-item.component';
import { PagosModule } from '../pagos/pagos.module';

@NgModule({
  declarations: [
    CarritoSidebarComponent,
    CarritoItemComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    PagosModule
  ],
  exports: [
    CarritoSidebarComponent
  ]
})
export class CarritoModule { }
