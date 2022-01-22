import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { TelegramService } from 'src/app/services/telegram.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-orders-confirmation-page',
  templateUrl: './orders-confirmation-page.component.html',
  styleUrls: ['./orders-confirmation-page.component.scss']
})
export class OrdersConfirmationPageComponent implements OnInit {
  
  ServerImagesUrl: string = environment.serverUrl;
  constructor(public orderService:OrderService,public router:Router,private telegramService:TelegramService) {
 
  }

  ngOnInit(): void {
  }
  NameChanged(event:any){
    this.orderService.order.userName = event.target.value;
    console.log(this.orderService.order);
  }
  PhoneChanged(event:any){
    this.orderService.order.phoneNumber = event.target.value;
    console.log(this.orderService.order);
  }
  CommentChanged(event:any){
    this.orderService.order.description = event.target.value;
    console.log(this.orderService.order);
  }
  SendOrder(){
    this.telegramService.SendOrderToTelegram(this.orderService.order).subscribe((res:any)=>{
      console.log(res);
    })
  }
}
