import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EscolherMunicipioComponent } from './escolher-municipio.component';

describe('EscolherMunicipioComponent', () => {
  let component: EscolherMunicipioComponent;
  let fixture: ComponentFixture<EscolherMunicipioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EscolherMunicipioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscolherMunicipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
