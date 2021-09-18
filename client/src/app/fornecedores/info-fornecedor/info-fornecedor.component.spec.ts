import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InfoFornecedorComponent } from './info-fornecedor.component';

describe('InfoFornecedorComponent', () => {
  let component: InfoFornecedorComponent;
  let fixture: ComponentFixture<InfoFornecedorComponent>;

  beforeEach(waitForAsync(() => {
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
