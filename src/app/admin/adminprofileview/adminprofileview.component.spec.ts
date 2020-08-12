import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminprofileviewComponent } from './adminprofileview.component';

describe('AdminprofileviewComponent', () => {
  let component: AdminprofileviewComponent;
  let fixture: ComponentFixture<AdminprofileviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminprofileviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminprofileviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
