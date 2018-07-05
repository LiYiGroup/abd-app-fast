import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSiderComponent } from './app-sider.component';

describe('AppSideComponent', () => {
  let component: AppSiderComponent;
  let fixture: ComponentFixture<AppSiderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSiderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
