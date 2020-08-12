import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminAdminComponent } from './super-admin-admin.component';

describe('SuperAdminAdminComponent', () => {
  let component: SuperAdminAdminComponent;
  let fixture: ComponentFixture<SuperAdminAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
