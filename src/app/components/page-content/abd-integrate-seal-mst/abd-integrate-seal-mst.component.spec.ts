import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbdIntegrateSealMstComponent } from './abd-integrate-seal-mst.component';

describe('AbdIntegrateSealMstComponent', () => {
  let component: AbdIntegrateSealMstComponent;
  let fixture: ComponentFixture<AbdIntegrateSealMstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbdIntegrateSealMstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbdIntegrateSealMstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
