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
  isOrderSuccessed:boolean =false;
  ServerImagesUrl: string = environment.serverUrl;
  errorMessage:boolean =false;
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
    if(this.orderService.order.phoneNumber.length >0 && this.orderService.order.userName.length >0){
      this.telegramService.SendOrderToTelegram(this.orderService.order).subscribe((res:any)=>{
        this.isOrderSuccessed =true;
      })
    }else{
      this.errorMessage =true;
    }
  }
  ClearOrder(){
    this.isOrderSuccessed =false;
    this.orderService.ClearOrder();
    this.router.navigate(['/']);
    setTimeout(()=>{
      window.scrollTo(0,0);
  })
  }
}
