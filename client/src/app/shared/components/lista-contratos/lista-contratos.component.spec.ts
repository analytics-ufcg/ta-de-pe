import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaContratosComponent } from './lista-contratos.component';

describe('ListaContratosComponent', () => {
  let component: ListaContratosComponent;
  let fixture: ComponentFixture<ListaContratosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaContratosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
