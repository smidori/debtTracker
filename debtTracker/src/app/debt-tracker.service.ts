import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DebtTrackerService {

  constructor(private storage: Storage) {
    this.init()
  }

  addPerson(key, value) {
    this.storage.set(key, value);
  }

  getPersons() {
    let people: any = []
    this.storage.forEach((key, value, index) => {
      people.push({ 'key': value, 'value': key })
    })
    return people
  }

  deletePerson(key) {
    this.storage.remove(key);
  }

  updatePerson(key, newValue) {
    this.storage.set(key, newValue);
  }

  /*
  async getPerson(id) {
    //const p = this.storage.get(id+"")
    //console.log("getPerson => " + p );
    return await this.storage.get(id+"")
  }
*/

  async getPerson(id): Promise<any> {
    try {
      const value = await this.storage.get(id);
      return value;
    } catch (error) {
      console.error('Error retrieving value:', error);
      return null;
    }
  }

  getPerson2(id){
    return this.storage.get(id);
  }

  async init() {
    await this.storage.create()
  }
}
