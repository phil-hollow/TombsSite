import { Injectable } from '@angular/core';
import { Tomb } from '../models/tomb';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    products: string = `
    [
        {
          "id":1,
          "name":"Надгробие №1",
          "description":"Гранитное надгробие, размер 120х180 см. Доставка и установка включена в стоимость",
          "picture":"1.jpg",
          "price":11000,
          "material":"Гранит"
        },
        {
            "id":2,
            "name":"Надгробие №2",
            "description":"Гранитное надгробие, размер 120х180 см. Доставка и установка включена в стоимость",
            "picture":"2.jpg",
            "price":11200,
            "material":"Гранит"
          },
          {
            "id":3,
            "name":"Надгробие №3",
            "description":"Гранитное надгробие, размер 120х180 см. Доставка и установка включена в стоимость",
            "picture":"3.jpg",
            "price":10500,
            "material":"Гранит"
          },
          {
            "id":4,
            "name":"Надгробие №4",
            "description":"Гранитное надгробие, размер 120х180 см. Доставка и установка включена в стоимость",
            "picture":"4.jpg",
            "price":11024,
            "material":"Гранит"
          },
          {
            "id":5,
            "name":"Надгробие №5",
            "description":"Гранитное надгробие, размер 120х180 см. Доставка и установка включена в стоимость",
            "picture":"5.jpg",
            "price":9452,
            "material":"Гранит"
          },
          {
            "id":6,
            "name":"Надгробие №6",
            "description":"Гранитное надгробие, размер 120х180 см. Доставка и установка включена в стоимость",
            "picture":"6.jpg",
            "price":8765,
            "material":"Гранит"
          },
          {
            "id":7,
            "name":"Надгробие №7",
            "description":"Гранитное надгробие, размер 120х180 см. Доставка и установка включена в стоимость",
            "picture":"7.jpg",
            "price":6000,
            "material":"Гранит"
          },
          {
            "id":8,
            "name":"Надгробие №8",
            "description":"Гранитное надгробие, размер 120х180 см. Доставка и установка включена в стоимость",
            "picture":"8.jpg",
            "price":13258,
            "material":"Гранит"
          },
          {
            "id":9,
            "name":"Надгробие №9",
            "description":"Гранитное надгробие, размер 120х180 см. Доставка и установка включена в стоимость",
            "picture":"9.jpg",
            "price":7898,
            "material":"Гранит"
          },
          {
            "id":10,
            "name":"Надгробие №10",
            "description":"Гранитное надгробие, размер 120х180 см. Доставка и установка включена в стоимость",
            "picture":"10.jpg",
            "price":4099,
            "material":"Гранит"
          },
          {
            "id":11,
            "name":"Надгробие №11",
            "description":"Гранитное надгробие, размер 120х180 см. Доставка и установка включена в стоимость",
            "picture":"11.jpg",
            "price":9065,
            "material":"Гранит"
          },
          {
            "id":12,
            "name":"Надгробие №12",
            "description":"Гранитное надгробие, размер 120х180 см. Доставка и установка включена в стоимость",
            "picture":"12.jpg",
            "price":13027,
            "material":"Мрамор"
          },
          {
            "id":13,
            "name":"Надгробие №12",
            "description":"Гранитное надгробие, размер 120х180 см. Доставка и установка включена в стоимость",
            "picture":"12.jpg",
            "price":13027,
            "material":"Мрамор"
          }
    ]
  `
    constructor() { }

    GetProducts(): Tomb[] {
        let products: Tomb[] = JSON.parse(this.products);
        return products
    }
    GetProductById(id: number): Tomb | undefined {
        let product: Tomb | undefined;
        this.GetProducts().forEach(item => {
            if (item.id === id) {
                product = item
            }
        })
        return product;
    }
    AddProduct(product: Tomb) {
        let products: Tomb[] = this.GetProducts();
        products.push(product);
        this.products = JSON.stringify(products);
    }
    DeleteProductById(id: number) {
        let products: Tomb[] = this.GetProducts();
        let index = products.findIndex(item => item.id === id);
        if (index >= 0) {
            products.splice(index, 1);
            this.products = JSON.stringify(products);
        }
    }
}
