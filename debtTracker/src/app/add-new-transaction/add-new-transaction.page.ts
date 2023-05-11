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
  amount: number
  transactionObj: Transaction
  status: string = 'open'; //payed and open
  dateTrx


  constructor(public modalCtrl: ModalController, public service: DebtTrackerService) { }

  ngOnInit() {
    this.description = 'aa' + Date.now()
    this.amount = 1
    this.status = 'open'
    this.type = 'Borrow'
    this.dateTrx = this.convertDate() //default value

  }

  async addTransaction() {

    console.log("date=> " + this.dateTrx);
    this.transactionObj = new Transaction(Date.now(), this.type, this.description, this.amount, this.status, this.dateTrx);
    console.log("send trx => " + JSON.stringify(this.transactionObj));

    this.dismiss();
  }

  async dismiss() {
    await this.modalCtrl.dismiss(this.transactionObj);
  }

  //get the current date/time in string format 'yyyy-MM-dd'T'HH:mm:ss'
  private convertDate() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return formattedDate
  }

}
