import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuscaCompraComponent } from './busca-compra.component';

describe('BuscaCompraComponent', () => {
  let component: BuscaCompraComponent;
  let fixture: ComponentFixture<BuscaCompraComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
