import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageComponent } from './pages/home-page/login-page.component';
import { LoginContainerComponent } from './components/login-container/login-container.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    LoginPageComponent,
    LoginContainerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ToastModule
  ],
  exports: [
    LoginPageComponent
  ]
})
export class LoginModule { }
