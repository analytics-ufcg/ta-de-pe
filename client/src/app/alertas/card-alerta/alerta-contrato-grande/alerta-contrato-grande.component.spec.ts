import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlertaContratoGrandeComponent } from './alerta-contrato-grande.component';

describe('AlertaContratoGrandeComponent', () => {
  let component: AlertaContratoGrandeComponent;
  let fixture: ComponentFixture<AlertaContratoGrandeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertaContratoGrandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertaContratoGrandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
