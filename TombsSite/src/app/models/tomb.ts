export class Tomb {
    id: number 
    name: string | undefined
    description: string | undefined
    material: string | undefined
    price: number | undefined
    picture: string | undefined
    category: Category =Category.None;
    constructor() {
        this.id = Date.now();
    }
}
export enum Category{
    None,
    Single,
    Double,
    Complex,
    Exclusive,
    Front,
    Back,
    Icon,
    Angel,
    Temple,
    Nature,
    Other,
    Additional,
    Photo
}