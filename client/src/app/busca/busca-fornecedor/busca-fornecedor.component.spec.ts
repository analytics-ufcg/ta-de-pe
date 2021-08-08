import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaFornecedorComponent } from './busca-fornecedor.component';

describe('BuscaFornecedorComponent', () => {
  let component: BuscaFornecedorComponent;
  let fixture: ComponentFixture<BuscaFornecedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaFornecedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
