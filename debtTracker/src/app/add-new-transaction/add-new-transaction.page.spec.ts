import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewTransactionPage } from './add-new-transaction.page';

describe('AddNewTransactionPage', () => {
  let component: AddNewTransactionPage;
  let fixture: ComponentFixture<AddNewTransactionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddNewTransactionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
