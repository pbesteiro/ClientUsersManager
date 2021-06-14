import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { LogService } from 'src/app/services/log.service';
import { RolService } from 'src/app/services/rol.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: [],
})
export class UserListComponent implements OnInit {
  constructor(
    private userService: UserService,
    private logService: LogService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  users: User[] = [];

  ngOnInit(): void {
    this.userService.getAll().subscribe(
      (res: User[]) => {
        this.users = res;
        this.logService.log(this.users);
      },
      (error: any) => {
        this.toastr.error('Error al buscar los usuarios.', 'Error');
      }
    );
  }

  back() {
    this.router.navigateByUrl('/');
  }

  goToCreate() {
    this.router.navigateByUrl('User/create');
  }
}
