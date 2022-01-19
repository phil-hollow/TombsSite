import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Tomb } from '../models/tomb';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    
    constructor(private http:HttpClient) { }

    GetProducts() {
        return this.http.get(environment.serverUrl + "/GetProducts");
    }
    GetProductById(id: number){
        return this.http.get(environment.serverUrl + "/GetProducts/" + id.toString());
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
}
