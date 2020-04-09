import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscolherMunicipioComponent } from './escolher-municipio.component';

describe('EscolherMunicipioComponent', () => {
  let component: EscolherMunicipioComponent;
  let fixture: ComponentFixture<EscolherMunicipioComponent>;

  beforeEach(async(() => {
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
