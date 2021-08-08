import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaInidoneosComponent } from './alerta-inidoneos.component';

describe('AlertaInidoneosComponent', () => {
  let component: AlertaInidoneosComponent;
  let fixture: ComponentFixture<AlertaInidoneosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertaInidoneosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertaInidoneosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
