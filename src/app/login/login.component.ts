import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { LogService } from '../services/log.service';
import {FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  password: string = '';
  email: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService,
    private logService: LogService
  ) {}

  ngOnInit() {
    this.email = '';
    this.password = '';

    if(this.loginService.isAuthtenticated())
      this.router.navigateByUrl('/');
  }

  login() {
    try {
      if (!this.password || !this.email) {
        this.toastr.error('Ingrese un Usuario y Contraseña válidos.', 'Error');
        return false;
      }
      this.loginService
        .loginUser(this.email, this.password)
        .subscribe((res: any) => {
          this.logService.log('entre');
          
          if (res && res.token) {            
            localStorage.setItem('token', res.token);
            this.router.navigateByUrl('/');
          }
        },
        (error: any)=>{
          this.toastr.error('Usuario o Contraseña no válidos.', 'Error');

        }
        );
      return true;
    } catch (err) {
      console.log('error catch');
      return false;
    }
  }
}
