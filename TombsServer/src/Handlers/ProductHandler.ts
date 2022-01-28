import { ProductWork } from "../Models/ProductWork";
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
    static GetProductWorks() : ProductWork[]{
        let productsWorks: ProductWork[] = JSON.parse(FileUtills.readProductWorksFile());
        return productsWorks;
    }
    static GetProductWorkById(id: number): ProductWork | undefined {
        let productWork: ProductWork | undefined;
        this.GetProductWorks().forEach(item => {
            if (item.id === id) {
                productWork = item
            }
        })
        return productWork;
    }
    static AddProductWork(productWork: ProductWork) {
        let productWorks: ProductWork[] = this.GetProductWorks();
        productWorks.push(productWork);
        FileUtills.writeProductFile(JSON.stringify(productWorks));
    }
    static DeleteProductWorkById(id: number) {
        let productWorks: ProductWork[] = this.GetProductWorks();
        let index = productWorks.findIndex(item => item.id === id);
        if (index >= 0) {
            productWorks.splice(index, 1);
            FileUtills.writeProductFile(JSON.stringify(productWorks));
        }
    }
    static EditProductWorkById( productWork:ProductWork){
        let productWorks = this.GetProductWorks();
        let index = productWorks.findIndex(item => item.id === productWork.id);
        if (index >= 0) {
            productWorks.splice(index, 1, productWork);
            FileUtills.writeProductFile(JSON.stringify(productWorks));
        }
    }
}