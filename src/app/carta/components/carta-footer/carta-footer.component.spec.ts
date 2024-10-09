import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaFooterComponent } from './carta-footer.component';

describe('CartaFooterComponent', () => {
  let component: CartaFooterComponent;
  let fixture: ComponentFixture<CartaFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartaFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartaFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
