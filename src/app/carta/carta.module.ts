import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartaPageComponent } from './pages/carta-page/carta-page.component';
import { CartaContenedorProductosComponent } from './components/carta-contenedor-productos/carta-contenedor-productos.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CartaHeaderComponent } from './components/carta-header/carta-header.component';
import { CartaFooterComponent } from './components/carta-footer/carta-footer.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CartaPageComponent,
    CartaContenedorProductosComponent,
    CartaHeaderComponent,
    CartaFooterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class CartaModule { }
