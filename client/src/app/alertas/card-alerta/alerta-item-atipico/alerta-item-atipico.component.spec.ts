import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaItemAtipicoComponent } from './alerta-item-atipico.component';

describe('AlertaItemAtipicoComponent', () => {
  let component: AlertaItemAtipicoComponent;
  let fixture: ComponentFixture<AlertaItemAtipicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertaItemAtipicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertaItemAtipicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
