import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicitacoesAbertasComponent } from './licitacoes-abertas.component';

describe('LicitacoesAbertasComponent', () => {
  let component: LicitacoesAbertasComponent;
  let fixture: ComponentFixture<LicitacoesAbertasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicitacoesAbertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicitacoesAbertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
