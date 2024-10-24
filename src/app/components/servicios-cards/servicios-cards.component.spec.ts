import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosCardsComponent } from './servicios-cards.component';

describe('ServiciosCardsComponent', () => {
  let component: ServiciosCardsComponent;
  let fixture: ComponentFixture<ServiciosCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiciosCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
