import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCuartosComponent } from './info-cuartos.component';

describe('InfoCuartosComponent', () => {
  let component: InfoCuartosComponent;
  let fixture: ComponentFixture<InfoCuartosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoCuartosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCuartosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
