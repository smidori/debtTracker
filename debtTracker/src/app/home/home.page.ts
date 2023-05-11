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

  ngOnInit() {
    //this.getAllPersons()
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

 
  getAllPersons() {
    this.people = this.service.getPersons();
  }


  async deletePerson(name, id) {

    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to delete: ' + name +" ?",
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
             this.service.deletePerson(id);
             this.getAllPersons(); //to refresh the list
          }
        }
      ]
    });
    await alert.present();
  }

 /*
deletePerson(id: number) {
this.service.deletePerson(id);
    this.getAllPersons(); //to refresh the list

}

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
