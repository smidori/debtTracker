import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DebtTrackerService } from '../debt-tracker.service';
import { Person } from '../person';

import { ActivatedRoute } from "@angular/router";
import { AddNewTransactionPage } from '../add-new-transaction/add-new-transaction.page';


@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.page.html',
  styleUrls: ['./update-details.page.scss'],
})
export class UpdateDetailsPage implements OnInit {

  @Input() personSelected;
  person: Person = new Person();
  transactions

  constructor(public modalCtrl: ModalController, public service: DebtTrackerService, private route: ActivatedRoute) { }


  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');

      this.service.getPerson(id).then(value => {
        this.personSelected = value;
        this.person.id = this.personSelected.id;
        this.person.name = this.personSelected.name;
        this.person.total = this.personSelected.total;
        this.person.transactions = this.personSelected.transactions;
      })
        .catch(error => {
          console.error('Error:', error);
        });
      
    });

  }

  async addTransaction(){
    const modal = await this.modalCtrl.create({
      component:AddNewTransactionPage
    })
    modal.onDidDismiss().then((newTrxObj)=> {
        this.transactions.push(newTrxObj.data as never); //??????
    })
     await modal.present()
  }
}
