import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { LoginPageComponent } from './pages/home-page/login-page.component';
import { LoginContainerComponent } from './components/login-container/login-container.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';

import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    LoginPageComponent,
    LoginContainerComponent,
    LoginRegisterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ToastModule,
    DialogModule,
    InputTextModule,
    ButtonModule
  ],
  exports: [
    LoginPageComponent,
    LoginRegisterComponent
  ]
})
export class LoginModule { }
