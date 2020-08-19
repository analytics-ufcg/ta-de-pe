import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFornecedorComponent } from './info-fornecedor.component';

describe('InfoFornecedorComponent', () => {
  let component: InfoFornecedorComponent;
  let fixture: ComponentFixture<InfoFornecedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoFornecedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
