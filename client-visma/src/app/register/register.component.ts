import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

     
  constructor(private http : HttpClient,
    private router: Router) { 

  }

onSubmit(): void{  
    var data= {'name': this.form.get('name')?.value,
    'email': this.form.get('email')?.value,
    'password': this.form.get('password')?.value,
    'department':1
  };

    this.http.get('https://vismachallenge.azurewebsites.net/api/user')
    .subscribe(res=> this.router.navigate(['/login']));
}


}
