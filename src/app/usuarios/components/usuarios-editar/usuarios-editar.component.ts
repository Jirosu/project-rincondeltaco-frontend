import { Component, Input } from '@angular/core';
import { ResponseUsuario } from '../../interface/response-usuario.interface';
import { Usuario } from '../../interface/usuario.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { MessageService } from 'primeng/api';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'usuarios-editar',
  templateUrl: './usuarios-editar.component.html',
  styleUrl: './usuarios-editar.component.css'
})
export class UsuariosEditarComponent {
  codProd: string = '';

  @Input()
  public idUsu: string = '';

  respuesta : ResponseUsuario = {
    valor: false,
    msg: ''
  }

  visible: boolean = false;

  usuario: Usuario = {
    codUsu: '',
    nomUsu: '',
    apeUsu: '',
    email: '',
    contrasena: '',
    rolUsu: ''
  };

  roles: string[] = [
    'Administrador', 'Usuario'
  ];

  constructor(private _usuService: UsuariosService, private messageService: MessageService, private _sharedService: SharedService ) {}

  obtenerProd(){
    this._usuService.getUsuarios().subscribe(usuarios => {
      this.usuario = usuarios.filter(usu => usu.codUsu === this.idUsu)[0];
    });
  }

  showDialog(condition: boolean) {
    this.visible = condition;
  }

  onSubmit() {
   this._usuService.updateUsuario(this.usuario).subscribe(response => {
     this.respuesta = response;
     console.log(this.respuesta);
     this.showToast();
     this._sharedService.formSubmitted.next();
    });
    this.showDialog(false);
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

  showSuccess(){
    this.messageService.add({ severity: 'success', summary: 'Success', detail: this.respuesta.msg });
  }
  showError(){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: this.respuesta.msg });
  }
}
