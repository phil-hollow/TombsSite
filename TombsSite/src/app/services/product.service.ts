import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Tomb } from '../models/tomb';
import { environment } from 'src/environments/environment.prod';
import { ProductWork } from '../models/productWork';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    
    constructor(private http:HttpClient) { }

    GetProducts() {
        return this.http.get(environment.serverUrl + "/GetProducts");
    }
    GetProductById(id: number){
        return this.http.get(environment.serverUrl + "/GetProductById/" + id.toString());
    }
    AddProduct(product: Tomb) {
        return this.http.post(environment.serverUrl + "/AddProduct", { product: product });
    }
    DeleteProductById(id: number) {
       return this.http.get(environment.serverUrl + "/DeleteProductById/" + id.toString())
    }
    EditProduct(product: Tomb){
        return this.http.post(environment.serverUrl + "/EditProduct", { product: product });
    }
    GetProductWorks() {
        return this.http.get(environment.serverUrl + "/GetProductWorks");
    }
    GetProductWorkById(id: number){
        return this.http.get(environment.serverUrl + "/GetProductWorkById/" + id.toString());
    }
    AddProductWork(productWork: ProductWork) {
        return this.http.post(environment.serverUrl + "/AddProductWork", { productWork: productWork });
    }
    DeleteProductWorkById(id: number) {
       return this.http.get(environment.serverUrl + "/DeleteProductWorkById/" + id.toString())
    }
    EditProductWork(productWork: ProductWork){
        return this.http.post(environment.serverUrl + "/EditProductWork", { productWork: productWork });
    }
    UploadImage(image:any,imgName:string){
        return this.http.post(environment.serverUrl + "/UploadImage", { img: image,imgName:imgName })
    }
}
