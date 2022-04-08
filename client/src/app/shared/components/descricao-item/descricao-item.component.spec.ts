import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DescricaoItemComponent } from './descricao-item.component';

describe('DescricaoItemComponent', () => {
  let component: DescricaoItemComponent;
  let fixture: ComponentFixture<DescricaoItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DescricaoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescricaoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
