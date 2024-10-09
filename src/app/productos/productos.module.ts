import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductosPageComponent } from './pages/productos-page/productos-page.component';
import { ProductosTableComponent } from './components/productos-table/productos-table.component';
import { ProductosFormComponent } from './components/productos-crear/productos-crear.component';
import { ProductosEditarComponent } from './components/productos-editar/productos-editar.component';

import { SharedModule } from '../shared/shared.module';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    ProductosPageComponent,
    ProductosTableComponent,
    ProductosFormComponent,
    ProductosEditarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TableModule,
    TagModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    StyleClassModule,
    DropdownModule,
    FormsModule,
    ToastModule,
    RippleModule,
    ConfirmDialogModule
  ]
})
export class ProductosModule {}
