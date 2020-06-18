import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoContratoComponent } from './info-contrato.component';

describe('InfoContratoComponent', () => {
  let component: InfoContratoComponent;
  let fixture: ComponentFixture<InfoContratoComponent>;

  beforeEach(async(() => {
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
