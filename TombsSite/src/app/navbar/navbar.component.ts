import { Component, OnInit } from '@angular/core';
import { AdminSessionService } from '../services/admin-session.service';
import { OrderService } from '../services/order.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    constructor(public orderService:OrderService, public adminSessionService:AdminSessionService) { 
      
    }

    ngOnInit(): void {
    }

}
