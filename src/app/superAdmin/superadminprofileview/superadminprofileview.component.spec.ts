import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminprofileviewComponent } from './superadminprofileview.component';

describe('SuperadminprofileviewComponent', () => {
  let component: SuperadminprofileviewComponent;
  let fixture: ComponentFixture<SuperadminprofileviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperadminprofileviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperadminprofileviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
