import { Component } from '@angular/core';
import { Person } from '../person';
import { ModalController } from '@ionic/angular';
import { DebtTrackerService } from '../debt-tracker.service';

import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


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

  constructor(public modalCtrl: ModalController,
    public service: DebtTrackerService,
    public navCtrl: NavController,
    private alertController: AlertController) {
  }

  ionViewWillEnter() {//will execute everytime before open the page
    this.getAllPersons() // to refresh the information in the screen
  }

  //add the person
  async addPerson() {
    if (this.personName.length > 0) {
      //create person
      let p = new Person();
      p.id = Date.now();
      p.name = this.personName;
      p.total = 0;
      p.transactions = [];

      //save in the storage
      await this.service.addPerson(p.id + "", p);
      this.personName = "";
    }
    this.getAllPersons();//to refresh the list
  }

  //get all people from storage
  async getAllPersons() {
    await this.service.getPersons()
      .then((people) => {
        this.people = people;
        console.log(this.people);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //show the alert screen to confirm to delete the person
  async deletePerson(name, id) {

    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to delete: ' + name + " ?",
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
            //delete from storage and refresh the data in the screen
            this.service.deletePerson(id);
            this.getAllPersons(); //to refresh the list
          }
        }
      ]
    });
    await alert.present();
  }

  //go to the screen to show the transactions created
  async updateDetails(id) {
    console.log("idparam = " + id)
    this.navCtrl.navigateForward(`/update-details/${id}`);
  }


}
