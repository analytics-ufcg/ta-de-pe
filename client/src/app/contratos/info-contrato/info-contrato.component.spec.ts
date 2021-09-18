import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InfoContratoComponent } from './info-contrato.component';

describe('InfoContratoComponent', () => {
  let component: InfoContratoComponent;
  let fixture: ComponentFixture<InfoContratoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
