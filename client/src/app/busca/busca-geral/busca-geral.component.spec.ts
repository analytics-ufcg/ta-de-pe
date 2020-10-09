import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaGeralComponent } from './busca-geral.component';

describe('BuscaGeralComponent', () => {
  let component: BuscaGeralComponent;
  let fixture: ComponentFixture<BuscaGeralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaGeralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
