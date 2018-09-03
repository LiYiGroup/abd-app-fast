import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherComponentModelComponent } from './other-component-model.component';

describe('CouplingTypeDataComponent', () => {
  let component: OtherComponentModelComponent;
  let fixture: ComponentFixture<OtherComponentModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherComponentModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherComponentModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
