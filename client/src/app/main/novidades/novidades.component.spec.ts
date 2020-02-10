import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovidadesComponent } from './novidades.component';

describe('NovidadesComponent', () => {
  let component: NovidadesComponent;
  let fixture: ComponentFixture<NovidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
