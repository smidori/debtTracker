import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DebtTrackerService } from '../debt-tracker.service';
import { Person } from '../person';

import { ActivatedRoute } from "@angular/router";
import { AddNewTransactionPage } from '../add-new-transaction/add-new-transaction.page';
import { Transaction } from '../transaction';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.page.html',
  styleUrls: ['./update-details.page.scss'],
})
export class UpdateDetailsPage implements OnInit {

  @Input() personSelected;
  person: Person = new Person();
  transactions :Transaction[] = [];

  constructor(public modalCtrl: ModalController, public service: DebtTrackerService, 
    private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');

      this.service.getPerson(id).then(value => {
        this.personSelected = value;
        console.log("value ====> " + JSON.stringify(this.personSelected));
        //console.log("value ====> " + this.personSelected)
        this.person.id = this.personSelected.id;
        this.person.name = this.personSelected.name;
        this.person.total = this.personSelected.total;
        //this.person.transactions = this.personSelected.transactions;
        this.transactions = this.personSelected.transactions;
        console.log("trx length ??????" + this.transactions.length)
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
      let obj = newTrxObj.data;
      let transaction : Transaction = new Transaction(obj.id, obj.type, obj.description, obj.amount, obj.status)
      this.transactions.push(transaction)

      let valueTrx : number = transaction.amount; 
      if(transaction.type == 'Borrow'){
        valueTrx = (valueTrx * -1);
      }
 
      this.person.total = Number(this.person.total) + Number(valueTrx)
      this.person.transactions = this.transactions;
      
      //save person
      this.service.updatePerson(this.person.id, this.person)
    })
     await modal.present()
  }

  goBackToHome(){
    //this.homePage.getAllPersons();
    this.router.navigateByUrl('/home');
  }

  
}
