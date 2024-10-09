import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interface/usuario.interface';
import { ResponseUsuario } from '../../interface/response-usuario.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { SharedService } from '../../../shared/services/shared.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'usuarios-table',
  templateUrl: './usuarios-table.component.html',
  styleUrl: './usuarios-table.component.css'
})
export class UsuariosTableComponent implements OnInit{

  public usuarios: Usuario[] = [];
  public loading: boolean = true;
  public id!: string;

  private _respProd: ResponseUsuario = {} as ResponseUsuario;

  constructor(private _usuService: UsuariosService, private _sharedService: SharedService, private confirmationService: ConfirmationService, private messageService: MessageService) {}

  get respProd(){
    return this._respProd;
  }

  ngOnInit() {
    this.loadUsuario();
    this._sharedService.formSubmitted.subscribe(() => {
      this.loadUsuario();
    });
  }

  loadUsuario(): void {
    this._usuService.getUsuarios().subscribe((resp) => {
      this.usuarios = resp;
    });
  }

  deleteProduct(id: string): void{
    this._usuService.deleteUsuario(id).subscribe( (resp) => {
      this._respProd = resp;
      this.loadUsuario();
    });
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Habilitado':
        return 'success';
      case 'Deshabilitado':
        return 'warning';
      default:
        return 'info';
    }
  }

  obtenerCodUsu(id: string) {
    this.id = id;
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Seguro que desea eliminar el usuario?',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      accept: () => {
        this.deleteProduct(this.id);
        this.messageService.add({ severity: 'info', summary: 'Usuario eliminado', detail: `El usuario con  ID: ${this.id} ha sido eliminado.` });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Acción Cancelada', detail: 'Eliminación cancelada.' });
      }
    });
  }

  openModalEdit() {
    console.log('UNO');
    this._sharedService.editModal.next();
  }

}
