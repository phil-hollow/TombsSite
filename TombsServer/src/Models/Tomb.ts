export class Tomb {
    id: number = 0
    name: string | undefined
    description: string | undefined
    material: string | undefined
    price: number | undefined
    picture: string | undefined
    category: Category = Category.None;
    private constructor() {
        this.id = Date.now();
    }
}
enum Category{
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