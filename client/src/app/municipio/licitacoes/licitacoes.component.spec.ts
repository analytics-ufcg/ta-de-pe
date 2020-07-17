import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicitacoesComponent } from './licitacoes.component';

describe('LicitacoesComponent', () => {
  let component: LicitacoesComponent;
  let fixture: ComponentFixture<LicitacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicitacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicitacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
