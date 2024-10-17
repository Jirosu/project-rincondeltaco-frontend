import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../login/services/login.service';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  valor: boolean = false;
  isAdmin: boolean = false;

  constructor(private _loginService: LoginService) { }

  ngOnInit() {
    this.getUserRol();
  }

  getUserRol() {
    this.isAdmin = this._loginService.getUserRol() === 'Administrador';
  }

}
