import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicitacoesDetalharContratosComponent } from './licitacoes-detalhar-contratos.component';

describe('LicitacoesDetalharContratosComponent', () => {
  let component: LicitacoesDetalharContratosComponent;
  let fixture: ComponentFixture<LicitacoesDetalharContratosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicitacoesDetalharContratosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicitacoesDetalharContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
