import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private loginService :LoginService
    ,private router: Router) { }

  logout(){
    if(this.loginService.logout())
      this.router.navigateByUrl('Login');
  
  }

}
