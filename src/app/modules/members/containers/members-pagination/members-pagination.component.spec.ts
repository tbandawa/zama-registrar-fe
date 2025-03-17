import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersPaginationComponent } from './members-pagination.component';

describe('MembersPaginationComponent', () => {
  let component: MembersPaginationComponent;
  let fixture: ComponentFixture<MembersPaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembersPaginationComponent]
    });
    fixture = TestBed.createComponent(MembersPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
