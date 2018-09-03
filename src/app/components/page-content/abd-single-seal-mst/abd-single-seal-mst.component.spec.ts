import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbdSingleSealMstComponent } from './abd-single-seal-mst.component';

describe('AbdSingleSealMstComponent', () => {
  let component: AbdSingleSealMstComponent;
  let fixture: ComponentFixture<AbdSingleSealMstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbdSingleSealMstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbdSingleSealMstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
