export class Transaction {
    type: string; //borrow or lend
    amount: number; 
    status: string; //payed and open
    description: string;

    constructor(type: string, description: string, amount: number, status: string){
        this.type = type;
        this.amount = amount;
        this.status = status;
        this.description = description
    }
}
