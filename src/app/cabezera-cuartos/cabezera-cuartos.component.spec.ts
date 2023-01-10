import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabezeraCuartosComponent } from './cabezera-cuartos.component';

describe('CabezeraCuartosComponent', () => {
  let component: CabezeraCuartosComponent;
  let fixture: ComponentFixture<CabezeraCuartosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabezeraCuartosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabezeraCuartosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
