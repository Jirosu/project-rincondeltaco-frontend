import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosPageComponent } from './pages/usuarios-page/usuarios-page.component';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosCrearComponent } from './components/usuarios-crear/usuarios-crear.component';
import { UsuariosTableComponent } from './components/usuarios-table/usuarios-table.component';
import { SharedModule } from '../shared/shared.module';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UsuariosEditarComponent } from './components/usuarios-editar/usuarios-editar.component';



@NgModule({
  declarations: [
    UsuariosPageComponent,
    UsuariosCrearComponent,
    UsuariosTableComponent,
    UsuariosEditarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
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
export class UsuariosModule { }
