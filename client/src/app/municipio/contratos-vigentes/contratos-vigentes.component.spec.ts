import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContratosVigentesComponent } from './contratos-vigentes.component';

describe('ContratosVigentesComponent', () => {
  let component: ContratosVigentesComponent;
  let fixture: ComponentFixture<ContratosVigentesComponent>;

  beforeEach(waitForAsync(() => {
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
