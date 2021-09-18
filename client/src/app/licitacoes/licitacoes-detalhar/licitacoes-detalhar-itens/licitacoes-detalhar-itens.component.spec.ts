import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LicitacoesDetalharItensComponent } from './licitacoes-detalhar-itens.component';

describe('LicitacoesDetalharItensComponent', () => {
  let component: LicitacoesDetalharItensComponent;
  let fixture: ComponentFixture<LicitacoesDetalharItensComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LicitacoesDetalharItensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicitacoesDetalharItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
