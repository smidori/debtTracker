import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DebtTrackerService } from '../debt-tracker.service';
import { Person } from '../person';

import { ActivatedRoute } from "@angular/router";
import { AddNewTransactionPage } from '../add-new-transaction/add-new-transaction.page';
import { Transaction } from '../transaction';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.page.html',
  styleUrls: ['./update-details.page.scss'],
})
export class UpdateDetailsPage implements OnInit {

  @Input() personSelected; //value will be set ngOnInit
  person: Person = new Person();
  transactions: Transaction[] = [];

  constructor(public modalCtrl: ModalController,
    public service: DebtTrackerService,
    private route: ActivatedRoute,
    private alertController: AlertController) { }

  //load the pre load the data 
  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');

      this.service.getPerson(id).then(value => {
        this.personSelected = value;
        this.person.id = this.personSelected.id;
        this.person.name = this.personSelected.name;
        this.person.total = this.personSelected.total;

        this.transactions = this.personSelected.transactions;
      })
        .catch(error => {
          console.error('Error:', error);
        });

    });

  }
  //add new transaction
  async addTransaction() {
    const modal = await this.modalCtrl.create({
      component: AddNewTransactionPage
    })
    modal.onDidDismiss().then((newTrxObj) => {
      let obj = newTrxObj.data;
      let transaction: Transaction = new Transaction(obj.id, obj.type, obj.description, obj.amount, obj.dateTrx)
      this.transactions.push(transaction)
      //recalculate the value
      let valueTrx: number = transaction.amount;
      if (transaction.type == 'Borrow') {
        valueTrx = (valueTrx * -1);
      }
      //update the value and the transactions
      let value = Number(this.person.total) + Number(valueTrx)
      this.person.total = Number(Number(value).toFixed(2))
      this.person.transactions = this.transactions;

      //save person
      this.service.updatePerson(this.person.id, this.person)
    })
    await modal.present()
  }


  //show the alert to confirm to delete the transaction
  async deleteTrxAlert(desc, index, amount, type) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to delete: ' + desc + " ?",
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //do nothing
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.deleteTrx(index, amount, type);
          }
        }
      ]
    });
    await alert.present();
  }


  //delete transaction
  deleteTrx(index, amount, type) {
    //recalculate the value
    let trxValue = Number(amount);
    if (type === 'Borrow') {
      trxValue = amount * -1;
    }

    //remove item from transactions
    this.transactions.splice(index, 1);

    //update info in person
    let value = Number(this.person.total) - Number(trxValue)
    this.person.total = Number(value.toFixed(2));
    this.person.transactions = this.transactions;

    //save person
    this.service.updatePerson(this.person.id, this.person)
  }

}

