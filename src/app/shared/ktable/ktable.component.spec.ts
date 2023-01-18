import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KtableComponent } from './ktable.component';

describe('KtableComponent', () => {
  let component: KtableComponent;
  let fixture: ComponentFixture<KtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KtableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
