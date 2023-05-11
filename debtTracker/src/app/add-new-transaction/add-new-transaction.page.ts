import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DebtTrackerService } from '../debt-tracker.service';
import { Transaction } from '../transaction';

@Component({
  selector: 'app-add-new-transaction',
  templateUrl: './add-new-transaction.page.html',
  styleUrls: ['./add-new-transaction.page.scss'],
})
export class AddNewTransactionPage implements OnInit {

  type
  description
  amount : number
  transactionObj : Transaction
  status: string = 'open'; //payed and open


  constructor(public modalCtrl: ModalController, public service: DebtTrackerService) { }

  ngOnInit() {
    this.description = 'aa' + Date.now()
    this.amount = 1
    this.status = 'open'
    this.type = 'Borrow'

  }

  async addTransaction() {
    /*
    this.transactionObj = ({
      description: this.description,
      amount: this.amount,
      status: this.status,
      type: this.type
    })
    let uid = Date.now();
    */
   /*
    this.transactionObj.description = this.description
    this.transactionObj.amount = this.amount
    this.transactionObj.status = this.status
    this.transactionObj.type = this.type
    this.transactionObj.id = Date.now();
    */
    
    this.transactionObj = new Transaction(Date.now(),  this.type, this.description, this.amount, this.status);
    this.dismiss();
  }

  async dismiss() {
    await this.modalCtrl.dismiss(this.transactionObj);
  }

}
