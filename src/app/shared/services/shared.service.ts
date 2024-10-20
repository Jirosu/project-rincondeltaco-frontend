import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  editModal = new Subject<void>();
  formSubmitted = new Subject<void>();
  cargarCarta = new Subject<void>();

}
