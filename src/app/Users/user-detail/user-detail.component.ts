import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { LogService } from 'src/app/services/log.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [],
})
export class UserDetailComponent implements OnInit {
  user: User = new User();
  id: number;
  constructor(
    private route: ActivatedRoute,
    private logService: LogService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (!this.id) {
      this.toastr.error('No se encontro el parámetro id', 'Error');
      return;
    }
    this.userService.get(this.id).subscribe(
      (res: User) => {
        this.user = res;
        this.logService.log(this.user);
      },
      (error: any) => {
        this.toastr.error('Error al buscar los usuarios.', 'Error');
      }
    );
  }

  back() {
    this.router.navigateByUrl('User');
  }
}
