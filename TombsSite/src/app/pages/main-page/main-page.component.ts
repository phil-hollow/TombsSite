import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    //var slides = document.querySelectorAll('.slides .slide');
    //var currentSlide = 0;
    //var slideInterval = setInterval(nextSlide, 2000);

    //function nextSlide() {s
    //  slides[currentSlide].className = 'slide';
    //  currentSlide = (currentSlide + 1) % slides.length;
    //  slides[currentSlide].className = 'slide showing';
}
