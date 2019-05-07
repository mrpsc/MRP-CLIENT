import { Injectable } from '@angular/core';
import { CanActivate , Router} from '@angular/router';

@Injectable()
export class CanActivateOAuthGuard implements CanActivate {

  constructor(public router:Router) {}
  canActivate() {
    if(sessionStorage.getItem("token") === null){
      this.router.navigateByUrl('/login');
    }
    return (sessionStorage.getItem("token") === null) ? false : true;
  }
}