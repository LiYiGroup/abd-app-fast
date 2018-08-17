import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerOrderComponent } from './inner-order.component';

describe('InnerOrderComponent', () => {
  let component: InnerOrderComponent;
  let fixture: ComponentFixture<InnerOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
