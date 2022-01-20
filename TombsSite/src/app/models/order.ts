import { ProductWork } from "./productWork";
import { Tomb } from "./tomb";

export class Order {
    id:number;
    tombs:Array<Tomb> = new Array<Tomb>();
    productWorks:Array<ProductWork> = new Array<ProductWork>();
    userName:string ="";
    phoneNumber:string="";
    description:string="";
    constructor(){
        this.id = Date.now();
    }
}