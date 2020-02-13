import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicitacoesDetalharComponent } from './licitacoes-detalhar.component';

describe('LicitacoesDetalharComponent', () => {
  let component: LicitacoesDetalharComponent;
  let fixture: ComponentFixture<LicitacoesDetalharComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicitacoesDetalharComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicitacoesDetalharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
