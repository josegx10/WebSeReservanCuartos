import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HazteAnfitrionComponent } from './hazte-anfitrion.component';

describe('HazteAnfitrionComponent', () => {
  let component: HazteAnfitrionComponent;
  let fixture: ComponentFixture<HazteAnfitrionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HazteAnfitrionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HazteAnfitrionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
