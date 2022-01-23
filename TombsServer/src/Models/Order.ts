import { ProductWork } from "./ProductWork";
import { Tomb } from "./Tomb";

export class Order {
    id:number;
    tombs:Array<Tomb> = new Array<Tomb>();
    productWorks:Array<ProductWork> = new Array<ProductWork>();
    userName:string ="";
    phoneNumber:string="";
    description:string="";
    private constructor(){
        this.id = Date.now();
    }
}