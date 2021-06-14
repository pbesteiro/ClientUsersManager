import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateRolComponent } from './Rols/create-rol/create-rol.component';
import { RolListComponent } from './Rols/rol-list/rol-list.component';
import { RolComponent } from './Rols/rol/rol.component';
import { UpdateRolComponent } from './Rols/update-rol/update-rol.component';
import { LoginGuardService } from './services/login.guard.service';
import { UserCreateComponent } from './Users/user-create/user-create.component';
import { UserDetailComponent } from './Users/user-detail/user-detail.component';
import { UserListComponent } from './Users/user-list/user-list.component';
import { UserUpdateComponent } from './Users/user-update/user-update.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [LoginGuardService] },
  { path: 'Login', component: LoginComponent },
  {
    path: 'Register',
    component: RegisterComponent,
    canActivate: [LoginGuardService],
  },
  {
    path: 'Rol',
    component: RolListComponent,
    canActivate: [LoginGuardService],
  },
  {
    path: 'Rol/:id/details',
    component: RolComponent,
    canActivate: [LoginGuardService],
  },
  {
    path: 'Rol/:id/edit',
    component: UpdateRolComponent,
    canActivate: [LoginGuardService],
  },
  {
    path: 'Rol/create',
    component: CreateRolComponent,
    canActivate: [LoginGuardService],
  },
  {
    path: 'User',
    component: UserListComponent,
    canActivate: [LoginGuardService],
  },
  {
    path: 'User/:id/details',
    component: UserDetailComponent,
    canActivate: [LoginGuardService],
  },
  {
    path: 'User/:id/edit',
    component: UserUpdateComponent,
    canActivate: [LoginGuardService],
  },
  {
    path: 'User/create',
    component: UserCreateComponent,
    canActivate: [LoginGuardService],
  },
  {
    path: '**',
    component: ErrorComponent,
    canActivate: [LoginGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
