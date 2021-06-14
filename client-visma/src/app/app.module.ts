import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { LogService } from './services/log.service';
import { ToastrModule } from 'ngx-toastr';
import { RolComponent } from './Rols/rol/rol.component';
import { RolListComponent } from './Rols/rol-list/rol-list.component';
import { LoginGuardService } from './services/login.guard.service';
import { RolService } from './services/rol.service';
import { UpdateRolComponent } from './Rols/update-rol/update-rol.component';
import { PermissionService } from './services/permission.service';
import { CreateRolComponent } from './Rols/create-rol/create-rol.component';
import { UserListComponent } from './Users/user-list/user-list.component';
import { UserService } from './services/user.service';
import { UserDetailComponent } from './Users/user-detail/user-detail.component';
import { UserUpdateComponent } from './Users/user-update/user-update.component';
import { UserCreateComponent } from './Users/user-create/user-create.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    RolComponent,
    RolListComponent,
    UpdateRolComponent,
    CreateRolComponent,
    UserListComponent,
    UserDetailComponent,
    UserUpdateComponent,
    UserCreateComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true,
      timeOut: 3000,
      progressAnimation: 'increasing',
    }),
  ],
  providers: [
    LoginService,
    LogService,
    LoginGuardService,
    RolService,
    PermissionService,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
