import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlertaAberturaEmpresaComponent } from './alerta-abertura-empresa.component';

describe('AlertaAberturaEmpresaComponent', () => {
  let component: AlertaAberturaEmpresaComponent;
  let fixture: ComponentFixture<AlertaAberturaEmpresaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertaAberturaEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertaAberturaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
