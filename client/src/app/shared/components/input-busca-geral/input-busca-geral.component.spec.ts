import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBuscaGeralComponent } from './input-busca-geral.component';

describe('InputBuscaGeralComponent', () => {
  let component: InputBuscaGeralComponent;
  let fixture: ComponentFixture<InputBuscaGeralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputBuscaGeralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBuscaGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
