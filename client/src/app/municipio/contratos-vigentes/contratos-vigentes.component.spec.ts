import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratosVigentesComponent } from './contratos-vigentes.component';

describe('ContratosVigentesComponent', () => {
  let component: ContratosVigentesComponent;
  let fixture: ComponentFixture<ContratosVigentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratosVigentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratosVigentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
