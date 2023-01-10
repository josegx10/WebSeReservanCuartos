import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCuartosComponent } from './menu-cuartos.component';

describe('MenuCuartosComponent', () => {
  let component: MenuCuartosComponent;
  let fixture: ComponentFixture<MenuCuartosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCuartosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCuartosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
