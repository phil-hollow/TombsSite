import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { ProductWork } from '../models/productWork';
import { Tomb } from '../models/tomb';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  order: Order=new Order();
  orderSum: number =0;
  constructor() {
    let orderJSON = sessionStorage.getItem('order');
    if(orderJSON){
      this.order = JSON.parse(orderJSON);
    }
    let orderSumValue = sessionStorage.getItem('orderSum');
    if(orderSumValue){
      this.orderSum = Number.parseInt(orderSumValue);
    }
   
  }
  AddTomb(tomb: Tomb) {
    this.order.tombs.push(tomb);
    this.CalculateOrderSum();
    this.SaveOrderDataInSession();
  }
  DeleteTombById(id: number) {
    let index = this.order.tombs.findIndex(el => el.id === id);
    if (index != -1) {
      this.order.tombs.splice(index, 1);
      this.CalculateOrderSum();
      this.SaveOrderDataInSession();
    }

  }
  AddProductWork(productWork: ProductWork) {
    this.order.productWorks.push(productWork);
    this.CalculateOrderSum();
    this.SaveOrderDataInSession();
  }
  DeleteProductWorkById(id: number) {
    let index = this.order.productWorks.findIndex(el => el.id === id);
    if (index != -1) {
      this.order.productWorks.splice(index, 1);
      this.CalculateOrderSum();
      this.SaveOrderDataInSession();
    }
  }
  private SaveOrderDataInSession(){
    sessionStorage.setItem('order',JSON.stringify(this.order));
    sessionStorage.setItem('orderSum',this.orderSum.toString());
  }
  private CalculateOrderSum() {
    this.orderSum = 0;
    this.order.tombs.forEach(tomb => {
      if (tomb.price) {
        this.orderSum += tomb.price;
      }
    })
    this.order.productWorks.forEach(productWork => {
      if (productWork.price) {
        this.orderSum += productWork.price;
      }
    })
  }
  
}
