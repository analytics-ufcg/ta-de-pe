import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LicitacoesComponent } from './licitacoes.component';

describe('LicitacoesComponent', () => {
  let component: LicitacoesComponent;
  let fixture: ComponentFixture<LicitacoesComponent>;

  beforeEach(waitForAsync(() => {
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
