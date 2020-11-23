import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAlertasComponent } from './filtro-alertas.component';

describe('FiltroAlertasComponent', () => {
  let component: FiltroAlertasComponent;
  let fixture: ComponentFixture<FiltroAlertasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAlertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAlertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
