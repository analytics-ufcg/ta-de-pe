import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaMunicipioComponent } from './busca-municipio.component';

describe('BuscaMunicipioComponent', () => {
  let component: BuscaMunicipioComponent;
  let fixture: ComponentFixture<BuscaMunicipioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaMunicipioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaMunicipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
