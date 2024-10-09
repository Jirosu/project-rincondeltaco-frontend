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
    usuario: '',
    contrasena: '',
    rolUsu: ''
  };

  public loginUser: Login = {
    usuario: '',
    contrasena: ''
  };

  response: any = {
    valor: '',
    msg: ''
  }

  constructor(private _usuService: UsuariosService, private _loginService: LoginService, private _router: Router, private messageService: MessageService) { }

  onSubmit() {
    console.log(this.loginUser);

    this._usuService.getUsuarios().subscribe((resp) => {
      let usuarios = resp;
      for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].usuario == this.loginUser.usuario && usuarios[i].contrasena == this.loginUser.contrasena) {
          this.usuarioEnc = usuarios[i];
          sessionStorage.setItem('nombre', this.usuarioEnc.nomUsu);
          sessionStorage.setItem('valor', 'true');
          console.log(this.usuarioEnc);
          this.showSuccess();
          setTimeout(() => {
            this._router.navigate(['/productos']);
          }, 2000);
          break;
        }
        this.showError();
      }
    });
  }

  showError(){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Credenciales Incorrectas.' });
  }

  showSuccess(){
    this.messageService.add({ severity: 'success', summary: 'Credenciales Correctas!', detail: `Bienvenido ${this.usuarioEnc.nomUsu} ${this.usuarioEnc.apeUsu}!` });
  }
}
