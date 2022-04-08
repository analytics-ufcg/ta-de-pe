import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LicitacoesDetalharNavComponent } from './licitacoes-nav.component';

describe('LicitacoesDetalharNavComponent', () => {
  let component: LicitacoesDetalharNavComponent;
  let fixture: ComponentFixture<LicitacoesDetalharNavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LicitacoesDetalharNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicitacoesDetalharNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
