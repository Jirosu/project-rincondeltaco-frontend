import { Component } from '@angular/core';
import { ResponseUsuario } from '../../interface/response-usuario.interface';
import { Usuario } from '../../interface/usuario.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { SharedService } from '../../../shared/services/shared.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'usuarios-crear',
  templateUrl: './usuarios-crear.component.html',
  styleUrl: './usuarios-crear.component.css'
})
export class UsuariosCrearComponent {
  respuesta : ResponseUsuario = {
    valor: false,
    msg: ''
  }

  usuario: Usuario = {
    codUsu: '',
    nomUsu: '',
    apeUsu: '',
    email: '',
    contrasena: '',
    rolUsu: ''
  };

  visible: boolean = false;

  constructor(private _usuService: UsuariosService, private _sharedService: SharedService, private messageService: MessageService) {}

  onSubmit() {
    let formData = new FormData();

    formData.append('data', JSON.stringify(this.usuario));

    let data = formData.get('data');
    console.log(data);

    this._usuService.createUsuario(formData).subscribe(response => {
      this.respuesta = response;
      //console.log(this.respuesta);
      this.showToast();
      //console.log('CUATRO');
      this._sharedService.formSubmitted.next();
    });

    this.showDialog(false);
    this.usuario = {
      codUsu: '',
      nomUsu: '',
      apeUsu: '',
      email: '',
      contrasena: '',
      rolUsu: ''
    }
  }

  showDialog(condition: boolean) {
    this.visible = condition;
  }

  showToast(){
    if(this.respuesta.valor === true){
      this.showSuccess();
      return;
    }
    if(this.respuesta.valor === false){
      this.showError();
      return;
    }
  }

  showError(){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: this.respuesta.msg });
  }

  showSuccess(){
    this.messageService.add({ severity: 'success', summary: 'Usuario Registrado!', detail: this.respuesta.msg });
  }
}
