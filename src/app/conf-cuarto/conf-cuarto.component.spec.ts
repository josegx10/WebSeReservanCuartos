import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfCuartoComponent } from './conf-cuarto.component';

describe('ConfCuartoComponent', () => {
  let component: ConfCuartoComponent;
  let fixture: ComponentFixture<ConfCuartoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfCuartoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfCuartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
