import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartaService {
  private readonly _apiUrl = 'http://localhost:8088';

  constructor() { }
}
