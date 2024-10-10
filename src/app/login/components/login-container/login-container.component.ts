import { Component } from '@angular/core';
import { Login } from '../../interfaces/login.interface';
import { UsuariosService } from '../../../usuarios/services/usuarios.service';
import { Usuario } from '../../../usuarios/interface/usuario.interface';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'login-container',
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.css'
})
export class LoginContainerComponent {
  usuarioEnc : Usuario = {
    codUsu: '',
    nomUsu: '',
    apeUsu: '',
    email: '',
    contrasena: '',
    rolUsu: ''
  };

  public loginUser: Login = {
    email: '',
    contrasena: ''
  };

  response: any = {
    valor: '',
    msg: ''
  }

  constructor(private _loginService: LoginService, private _router: Router, private messageService: MessageService) { }

  onSubmit() {
    this.usuarioEnc.email = this.loginUser.email;
    this.usuarioEnc.contrasena = this.loginUser.contrasena;

    let formData = new FormData();
    formData.append('data', JSON.stringify(this.usuarioEnc));

    this._loginService.loginUsuarios(formData).subscribe({
      next: (response) => {
        if (!response.valor) {
          this.showError();
          return;
        }
        sessionStorage.setItem('nombre', response.name!);
        sessionStorage.setItem('rol', response.rol!);
        sessionStorage.setItem('valor', 'true');

        this.showSuccess(response.name!);
        setTimeout(() => {
          this._router.navigate(['/productos']);
        }, 2000);
      },
      error: (err) => {
        if (err.status === 401) { // 401 Unauthorized
          this.showError();
        } else {
          console.error('Error no esperado:', err);
        }
      }
    });
  }

  showError(){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Credenciales Incorrectas.' });
  }

  showSuccess(usuNom: string){
    this.messageService.add({ severity: 'success', summary: 'Credenciales Correctas!', detail: `Bienvenido ${usuNom}!` });
  }
}
