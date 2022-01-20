import { Tomb } from "./tomb";

export class ProductWork {
    id: number 
    name: string | undefined
    description: string | undefined
    price: number | undefined
    picture: string | undefined
    constructor(){
        this.id = Date.now();
    }
}