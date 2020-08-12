import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminAddAdminComponent } from './super-admin-add-admin.component';

describe('SuperAdminAddAdminComponent', () => {
  let component: SuperAdminAddAdminComponent;
  let fixture: ComponentFixture<SuperAdminAddAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminAddAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminAddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
