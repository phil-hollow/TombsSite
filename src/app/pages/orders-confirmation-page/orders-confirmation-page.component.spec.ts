import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersConfirmationPageComponent } from './orders-confirmation-page.component';

describe('OrdersConfirmationPageComponent', () => {
  let component: OrdersConfirmationPageComponent;
  let fixture: ComponentFixture<OrdersConfirmationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersConfirmationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersConfirmationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
