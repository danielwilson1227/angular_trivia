import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaingameComponent } from './maingame.component';

describe('MaingameComponent', () => {
  let component: MaingameComponent;
  let fixture: ComponentFixture<MaingameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaingameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaingameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
