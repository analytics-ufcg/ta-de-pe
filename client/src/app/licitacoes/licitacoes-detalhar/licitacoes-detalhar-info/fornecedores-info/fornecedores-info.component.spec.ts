import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedoresInfoComponent } from './fornecedores-info.component';

describe('FornecedoresInfoComponent', () => {
  let component: FornecedoresInfoComponent;
  let fixture: ComponentFixture<FornecedoresInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FornecedoresInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FornecedoresInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
