import { Component } from '@angular/core';
import { Person } from '../person';
import { Transaction } from '../transaction';
import { ModalController } from '@ionic/angular';
import { DebtTrackerService } from '../debt-tracker.service';
import { UpdateDetailsPage } from '../update-details/update-details.page';

import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  personId
  people
  personName: string = "";
  today: number = Date.now();

  constructor(public modalCtrl: ModalController, public service: DebtTrackerService, public navCtrl: NavController) {
    this.getAllPersons()
  }

  async addPerson() {
    if (this.personName.length > 0) {
      let p = new Person();      
      p.id = Date.now();
      p.name = this.personName;
      p.total = 0;
      p.transactions = [];
      await this.service.addPerson(p.id + "", p);
      this.personName = "";
    }
    this.getAllPersons();//to refresh the list
  }

  getTemp() {
    console.log(this.service.getPersons())
  }

  getAllPersons() {
    this.people = this.service.getPersons();
  }


  deletePerson(id: number) {
    this.service.deletePerson(id);
    this.getAllPersons(); //to refresh the list
  }

 /*
  async goDetails(id: number) {
    const modal = await this.modalCtrl.create({
      component: DetailPage
    })

    this.personId = this.people[id];

    await modal.present();
  }

 
  async updateDetails(selectedPerson) {
    const modal = await this.modalCtrl.create({
      component: UpdateDetailsPage,
      componentProps: {personSelected: selectedPerson}
    })
    console.log("send ud" + selectedPerson) 
    console.log("--> " + selectedPerson.value.name) 
    await await modal.present();
  }
*/

  async updateDetails(id) {
    console.log("idparam = " + id)
    this.navCtrl.navigateForward(`/update-details/${id}`);
  }


}
