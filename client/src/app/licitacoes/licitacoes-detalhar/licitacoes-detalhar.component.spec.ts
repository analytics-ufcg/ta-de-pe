import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LicitacoesDetalharComponent } from './licitacoes-detalhar.component';

describe('LicitacoesDetalharComponent', () => {
  let component: LicitacoesDetalharComponent;
  let fixture: ComponentFixture<LicitacoesDetalharComponent>;

  beforeEach(waitForAsync(() => {
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
