import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DescricaoContratoComponent } from './descricao-contrato.component';

describe('DescricaoContratoComponent', () => {
  let component: DescricaoContratoComponent;
  let fixture: ComponentFixture<DescricaoContratoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DescricaoContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescricaoContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
