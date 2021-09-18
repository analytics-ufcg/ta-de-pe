import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenuAlertaComponent } from './menu-alerta.component';

describe('MenuAlertaComponent', () => {
  let component: MenuAlertaComponent;
  let fixture: ComponentFixture<MenuAlertaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAlertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
