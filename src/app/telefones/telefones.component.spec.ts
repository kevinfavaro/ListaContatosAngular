import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelefonesComponent } from './telefones.component';

describe('TelefonesComponent', () => {
  let component: TelefonesComponent;
  let fixture: ComponentFixture<TelefonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelefonesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelefonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
