import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardAlertaComponent } from './card-alerta.component';

describe('CardAlertaComponent', () => {
  let component: CardAlertaComponent;
  let fixture: ComponentFixture<CardAlertaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CardAlertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
