import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class LoginGuardService implements CanActivate {
  constructor(private loginService: LoginService, private route: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.loginService.isAuthtenticated()) {
      console.log('guard service allows rute');
      return true;
    } else {
      console.log('guard service dont allow rute');
      this.route.navigateByUrl('Login');
      return false;
    }
  }
}
