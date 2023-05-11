import { Transaction } from "./transaction";

export class Person {
    id: number;
    name:string;
    total: number;
    transactions: Transaction[];
    
    constructor(){}
    /*
    constructor(name:string){
        this.name = name;
        this.total = 0;
        this.transactions = [];
        this.id = Date.now();
    }
    */

    addTransaction(id: number, type: string, description: string, amount: number, status: string){
        let transaction = new Transaction(id, type,description,amount,status);
        this.transactions.push(transaction);
    }
}