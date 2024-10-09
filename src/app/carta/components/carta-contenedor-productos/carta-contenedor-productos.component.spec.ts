import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaContenedorProductosComponent } from './carta-contenedor-productos.component';

describe('CartaContenedorProductosComponent', () => {
  let component: CartaContenedorProductosComponent;
  let fixture: ComponentFixture<CartaContenedorProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartaContenedorProductosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartaContenedorProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
