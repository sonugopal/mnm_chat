import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminChatComponent } from './super-admin-chat.component';

describe('SuperAdminChatComponent', () => {
  let component: SuperAdminChatComponent;
  let fixture: ComponentFixture<SuperAdminChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
