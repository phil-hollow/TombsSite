import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminSessionService } from 'src/app/services/admin-session.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(private adminSessionService: AdminSessionService,private router:Router) { }

  ngOnInit(): void {
  }
  Login(){
    let login = (document.getElementById("login") as HTMLInputElement).value;
    let password = (document.getElementById("password") as HTMLInputElement).value;
    let isAuthorizated = this.adminSessionService.CheckCreds(login,password);
    if(isAuthorizated){
      this.router.navigate(['/']);
    }
  }
}
