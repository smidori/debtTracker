import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateDetailsPage } from './update-details.page';

describe('UpdateDetailsPage', () => {
  let component: UpdateDetailsPage;
  let fixture: ComponentFixture<UpdateDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
