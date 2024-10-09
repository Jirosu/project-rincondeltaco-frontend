import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaHeaderComponent } from './carta-header.component';

describe('CartaHeaderComponent', () => {
  let component: CartaHeaderComponent;
  let fixture: ComponentFixture<CartaHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartaHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
