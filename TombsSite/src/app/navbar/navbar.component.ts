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
    GoToContacts() {
        this.router.navigate(['/']);
        window.scroll(66666666, 66666666);
    }
}
