import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AdminSessionService {
  isAuthorizated =false;
  constructor() {
   }
  CheckCreds(login:string,password:string){
    this.isAuthorizated=environment.adminLogin === login && environment.adminPassword === password;
    return this.isAuthorizated;
  }
}
