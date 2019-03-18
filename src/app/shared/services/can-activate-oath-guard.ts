import { Injectable } from '@angular/core';
import { CanActivate , Router} from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class CanActivateOAuthGuard implements CanActivate {

  constructor(public router:Router) {}
  canActivate() {
    if(localStorage.getItem(environment.tokenLocalStorageKey) === null){
      this.router.navigateByUrl('/login');
    }
    return (localStorage.getItem(environment.tokenLocalStorageKey) === null) ? false : true;
  }
}