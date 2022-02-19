import { Component, OnInit } from '@angular/core';
import { TelegramService } from 'src/app/services/telegram.service';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  recallMessage:boolean =false;
  errorMessage:boolean =false;
    constructor(private telegramService:TelegramService) { }

    ngOnInit(): void {
    }
    SendRecallMeMessage(){
      let name=  (document.getElementById("name") as HTMLInputElement).value;
      let phone=  (document.getElementById("phone") as HTMLInputElement).value;
      if(name.length >0 && name.length >0){
        this.telegramService.SendRecallMeToTelegram(name,phone).subscribe(res=>{
          this.recallMessage =true;
        });
      }else{
        this.errorMessage =true;
      }
    }

    //var slides = document.querySelectorAll('.slides .slide');
    //var currentSlide = 0;
    //var slideInterval = setInterval(nextSlide, 2000);

    //function nextSlide() {s
    //  slides[currentSlide].className = 'slide';
    //  currentSlide = (currentSlide + 1) % slides.length;
    //  slides[currentSlide].className = 'slide showing';
}
