import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroMunicipioComponent } from './filtro-municipio.component';

describe('FiltroMunicipioComponent', () => {
  let component: FiltroMunicipioComponent;
  let fixture: ComponentFixture<FiltroMunicipioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroMunicipioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroMunicipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
