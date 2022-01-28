import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminSessionService } from '../services/admin-session.service';
import { OrderService } from '../services/order.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    constructor(public orderService: OrderService,
        public adminSessionService: AdminSessionService,
        private router: Router) {

    }

    ngOnInit(): void {
    }
    GoToMainPage(){
        this.router.navigate(['/']);
        setTimeout(()=>{
            window.scrollTo(0,0);
            this.HideMenu();
        })
    }
    GoToContacts() {
        this.router.navigate(['/']);
        setTimeout(()=>{
            window.scrollTo(0, document.body.scrollHeight);
            this.HideMenu();
        })
    }
    NavigateTo(path:string){
        this.router.navigate([path]);
        this.HideMenu();
    }
    HideMenu(){
        (document.getElementById('menu__toggle') as HTMLInputElement).checked = false;
    }
}
