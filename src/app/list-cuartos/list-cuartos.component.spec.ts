import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCuartosComponent } from './list-cuartos.component';

describe('ListCuartosComponent', () => {
  let component: ListCuartosComponent;
  let fixture: ComponentFixture<ListCuartosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCuartosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCuartosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
