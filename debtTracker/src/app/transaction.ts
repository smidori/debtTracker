export class Transaction {
    id: number
    type: string; //borrow or lend
    amount: number; 
    description: string;
    dateTrx : Date;

    constructor(id:number, type: string, description: string, amount: number, dateTrx: Date ){
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.description = description;
        this.dateTrx = dateTrx;
    }
}
