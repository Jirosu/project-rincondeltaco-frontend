import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Login } from '../../interfaces/login.interface';
import { Usuario } from '../../../usuarios/interface/usuario.interface';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsuariosService } from '../../../usuarios/services/usuarios.service';
import { ResponseUsuario } from '../../../usuarios/interface/response-usuario.interface';
import { CarritoService } from '../../../carrito/services/carrito.service';

@Component({
  selector: 'login-register',
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent implements OnInit {

  isLogged: boolean = false;
  visible: boolean = false;
  registerMode: boolean = false;

  loginUser: Login = {
    email: '',
    contrasena: ''
  };

  registerUser : Usuario = {
    codUsu: '',
    nomUsu: '',
    apeUsu: '',
    email: '',
    contrasena: '',
    rolUsu: ''
  };

  respuesta : ResponseUsuario = {
    valor: false,
    msg: ''
  };

  @Output()
  public onUserSessionChanged: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {
    this.isLogged = this._loginService.validateLogin();
  }

  constructor(private _loginService: LoginService, private _usuService: UsuariosService,
      private _router: Router, private messageService: MessageService,
      private _carritoService: CarritoService) { }

  changeVisibility() : void {
    this.visible = !this.visible;    
    this.registerMode = false;
    this.cleanForm();    
  }

  changeMode() : void {
    this.registerMode = !this.registerMode;
    this.cleanForm();    
  }

  cleanForm() : void {
    this.loginUser = {
      email: '',
      contrasena: ''
    };

    this.registerUser = {
      codUsu: '',
      nomUsu: '',
      apeUsu: '',
      email: '',
      contrasena: '',
      rolUsu: ''
    }
  }

  login() : void {
    // const user: Usuario = {
    //   codUsu: '',
    //   nomUsu: '',
    //   apeUsu: '',
    //   ...this.loginUser,
    //   rolUsu: ''
    // }

    // let formData = new FormData();
    // formData.append('data', JSON.stringify(user));
    
    // this._loginService.loginUsuarios(formData).subscribe({
    this._loginService.loginUsuarios(this.loginUser).subscribe({
      next: (response) => {
        if (!response.valor) {
          this.respuesta = response;
          this.showError();
          return;
        }
        sessionStorage.setItem('nombre', response.name!);
        sessionStorage.setItem('rol', response.rol!);
        sessionStorage.setItem('id', (response.id!.toString()));
        sessionStorage.setItem('valor', 'true');

        this.respuesta = response;
        this.showSuccess();
        this.isLogged = true;
        this.cleanForm();
        this.changeVisibility();
        this.onUserSessionChanged.emit();
        setTimeout(() => {
          this._router.navigate(['/carta']);
        }, 2000);
      },
      error: (err) => {
        if (err.status === 401) { // 401 Unauthorized
          this.respuesta = err.error;
          this.showError();
        } else {
          console.error('Error no esperado:', err);
        }
      }
    });

  }

  register() : void {
    this.registerUser.rolUsu = 'Usuario';

    let formData = new FormData();
    formData.append('data', JSON.stringify(this.registerUser));

    this._usuService.createUsuario(formData).subscribe({
      next: (response) => {
        if (!response.valor) {
          this.respuesta = response;
          this.showError();
          return;
        }

        this.respuesta = response;
        this.showSuccess();
        this.changeMode();
        this.cleanForm();
      },
      error: (err) => {
        if (err.status === 401) { // 401 Unauthorized
          this.respuesta = err.error;
          this.showError();
        } else {
          console.error('Error no esperado:', err);
        }
      }
    });
  }

  logout() {
    // sessionStorage.removeItem('valor');
    // sessionStorage.removeItem('nombre');
    // sessionStorage.removeItem('rol');
    // sessionStorage.removeItem('id');
    sessionStorage.clear();
    this._carritoService.deleteCarrito();

    this.isLogged = false;
    this.onUserSessionChanged.emit();

    this.respuesta = {
      valor: true,
      msg: 'Sesión cerrada exitosamente'
    };
    this.showSuccess();
    setTimeout(() => {
      this._router.navigate(['/carta']);
    }, 2000);
  }


  showError(){
    this.messageService.add({ severity: 'error', summary: this.respuesta.msg});
  }

  showSuccess(){
    this.messageService.add({ severity: 'success', summary: this.respuesta.msg});
  }
}
