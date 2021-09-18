import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuscaItemComponent } from './busca-item.component';

describe('BuscaItemComponent', () => {
  let component: BuscaItemComponent;
  let fixture: ComponentFixture<BuscaItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
