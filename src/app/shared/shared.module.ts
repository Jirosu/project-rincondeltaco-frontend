import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoginModule } from '../login/login.module';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LoginModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule { }
