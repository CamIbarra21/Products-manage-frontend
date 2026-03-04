import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpperBar } from './upper-bar';

describe('UpperBar', () => {
  let component: UpperBar;
  let fixture: ComponentFixture<UpperBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpperBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpperBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
