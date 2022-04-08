import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NovidadeComponent } from './novidade.component';

describe('NovidadeComponent', () => {
  let component: NovidadeComponent;
  let fixture: ComponentFixture<NovidadeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NovidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
