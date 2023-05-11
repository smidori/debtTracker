import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DebtTrackerService {

  //use the ionic storage to save the data
  constructor(private storage: Storage) {
    //create the storage
    this.init()
  }

  //save the person and transactions relate to them
  async addPerson(key, value) {
    await this.storage.set(key, value);
  }

  //get the people saved and their transactions
  async getPersons() {
    let people: any = []
    await this.storage.forEach((key, value, index) => {
      people.push({ 'key': value, 'value': key })
    })
    return people
  }

  //delete the person and their transactions as well
  async deletePerson(key) {
    await this.storage.remove(key);
  }

  //update the person (including transactions)
  async updatePerson(key, newValue) {
    await this.storage.set(key, newValue);
  }

  //retrieve an specific person
  async getPerson(id): Promise<any> {
    try {
      const value = await this.storage.get(id);
      return value;
    } catch (error) {
      console.error('Error retrieving value:', error);
      return null;
    }
  }

  //create the storage
  async init() {
    await this.storage.create()
  }
}
