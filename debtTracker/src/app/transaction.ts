export class Transaction {
    id: number
    type: string; //borrow or lend
    amount: number; 
    status: string; //payed and open
    description: string;
    dateTrx : Date;

    constructor(id:number, type: string, description: string, amount: number, status: string, dateTrx: Date ){
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.status = status;
        this.description = description;
        this.dateTrx = dateTrx;
    }
}
