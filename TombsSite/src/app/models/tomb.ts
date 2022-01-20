export class Tomb {
    id: number 
    name: string | undefined
    description: string | undefined
    material: string | undefined
    price: number | undefined
    picture: string | undefined
    constructor() {
        this.id = Date.now();
    }
}