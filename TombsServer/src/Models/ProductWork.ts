
export class ProductWork {
    id: number 
    name: string | undefined
    description: string | undefined
    price: number | undefined
    picture: string | undefined
    private constructor(){
        this.id = Date.now();
    }
}