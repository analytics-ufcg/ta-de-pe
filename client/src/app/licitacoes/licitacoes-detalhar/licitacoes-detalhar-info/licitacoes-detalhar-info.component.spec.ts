import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LicitacoesDetalharInfoComponent } from './licitacoes-detalhar-info.component';

describe('LicitacoesDetalharInfoComponent', () => {
  let component: LicitacoesDetalharInfoComponent;
  let fixture: ComponentFixture<LicitacoesDetalharInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LicitacoesDetalharInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicitacoesDetalharInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
