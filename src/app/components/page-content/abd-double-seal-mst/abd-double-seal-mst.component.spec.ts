import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbdDoubleSealMstComponent } from './abd-double-seal-mst.component';

describe('AbdDoubleSealMstComponent', () => {
  let component: AbdDoubleSealMstComponent;
  let fixture: ComponentFixture<AbdDoubleSealMstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbdDoubleSealMstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbdDoubleSealMstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
