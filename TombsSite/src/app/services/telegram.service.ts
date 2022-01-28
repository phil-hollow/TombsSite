import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Order } from '../models/order';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class TelegramService {

  constructor(private http:HttpClient) { }
  SendOrderToTelegram(order:Order){
    let message = 'ЗАКАЗ \n';
    message+= 'ФИО: ' + order.userName + '\n';
    message+= 'Номер телефона: ' +order.phoneNumber +'\n';
    message+= '\n ТОВАРЫ В ЗАКАЗЕ \n'
    order.tombs.forEach(tomb=>{
        message+='Название товара: '+tomb.name+'\n';
        message+='Материал: ' +tomb.material+'\n';
        message+='Описание товара: '+tomb.description+'\n';
        message+='Цена товара: '+tomb.price+' грн.'+'\n';
    })
    message+= '\n УСЛУГИ В ЗАКАЗЕ \n'
    order.productWorks.forEach(productWork=>{
        message+='Название услуги: '+productWork.name+'\n';
        message+='Описание услуги: '+productWork.description+'\n';
        message+='Цена услуги: '+productWork.price+' грн.'+'\n \n';
    })
    message+= 'Комментарий к заказу: ' +order.description +'\n\n';
    let orderSum = 0;
    order.tombs.forEach(tomb => {
      if (tomb.price) {
        orderSum += tomb.price;
      }
    })
    order.productWorks.forEach(productWork => {
      if (productWork.price) {
        orderSum += productWork.price;
      }
    })
    message+= 'ОБЩАЯ СТОИМОСТЬ: ' + orderSum.toString().toUpperCase() +' грн.';
    message =encodeURI(message);
    return this.http.post(`https://api.telegram.org/bot${environment.telegramBotToken}/sendMessage?chat_id=${environment.telegramChatId}&parse_mode=html&text=${message}`,{});
  }
  SendRecallMeToTelegram(name:string, phone:string){
    let message= ' ПЕРЕЗВОНИТЕ МНЕ \n \n'
    message+= 'ФИО: ' + name + '\n';
    message+= 'Номер телефона: ' + phone +'\n';
    message =encodeURI(message);
    return this.http.post(`https://api.telegram.org/bot${environment.telegramBotToken}/sendMessage?chat_id=${environment.telegramChatId}&parse_mode=html&text=${message}`,{});
  }
}
