import { Tomb } from "../Models/Tomb";
import { FileUtills } from "../Utills/FileUtills";

export class ProductHandler{
    constructor(){

    }
    static GetProducts() : Tomb[]{
        let products: Tomb[] = JSON.parse(FileUtills.readProductsFile());
        return products
    }
    static GetProductById(id: number): Tomb | undefined {
        let product: Tomb | undefined;
        this.GetProducts().forEach(item => {
            if (item.id === id) {
                product = item
            }
        })
        return product;
    }
    static AddProduct(product: Tomb) {
        let products: Tomb[] = this.GetProducts();
        products.push(product);
        FileUtills.writeProductFile(JSON.stringify(products));
    }
    static DeleteProductById(id: number) {
        let products: Tomb[] = this.GetProducts();
        let index = products.findIndex(item => item.id === id);
        if (index >= 0) {
            products.splice(index, 1);
            FileUtills.writeProductFile(JSON.stringify(products));
        }
    }
    static EditProductById( product:Tomb){
        let products = this.GetProducts();
        let index = products.findIndex(item => item.id === product.id);
        if (index >= 0) {
            products.splice(index, 1, product);
            FileUtills.writeProductFile(JSON.stringify(products));
        }
    }
}