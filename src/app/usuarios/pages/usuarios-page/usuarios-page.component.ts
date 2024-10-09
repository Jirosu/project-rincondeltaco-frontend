import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'usuarios-page',
  templateUrl: './usuarios-page.component.html',
  styleUrl: './usuarios-page.component.css'
})
export class UsuariosPageComponent implements OnInit{

  constructor(private _router: Router) { }

  ngOnInit() {
    if(sessionStorage.getItem('valor') == null) {
      this._router.navigate(['/login']);
    }
  }
}
