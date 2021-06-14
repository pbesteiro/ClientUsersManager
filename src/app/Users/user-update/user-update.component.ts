import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rol } from 'src/app/models/rol.model';
import { User } from 'src/app/models/user.model';
import { LogService } from 'src/app/services/log.service';
import { RolService } from 'src/app/services/rol.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styles: [],
})
export class UserUpdateComponent implements OnInit {
  user: User = new User();
  id: number;
  rols: Rol[];
  name: string;
  email: string;

  constructor(
    private route: ActivatedRoute,
    private logService: LogService,
    private userService: UserService,
    private rolService: RolService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      //if i got an set the user information
      this.userService.get(this.id).subscribe(
        (res: User) => {
          this.logService.log(res);
          this.user = res;
          this.name = this.user.name;
          this.email = this.user.email;
        },
        (error: any) => {
          this.logService.log(error);
          this.toastr.error('Error al buscar el usuario.', 'Error');
        }
      );
    }

    //always get all the permission
    this.rolService.getAll().subscribe(
      (res: Rol[]) => {
        this.rols = res;
        this.logService.log(this.rols);
      },
      (error: any) => {
        this.toastr.error('Error al buscar los roles.', 'Error');
      }
    );
  }

  hasRolAssigned(rol: Rol): boolean {
    let rolSearched = this.user.rols.filter((x) => x.id === rol.id);
    return rolSearched.length != 0;
  }

  back() {
    this.router.navigateByUrl('User');
  }

  updateUserRols(checkState: any, rol: Rol) {
    checkState.stopPropagation();
    if (!checkState.currentTarget.checked) {
      this.user.rols.forEach((element, index) => {
        if (element.id == rol.id) {
          this.user.rols.splice(index, 1);
          return;
        }
      });
    } else {
      this.user.rols.push(rol);
    }
  }

  save() {
    try {
      if (!this.name || !this.email) {
        this.toastr.warning(
          'Nombre, email y password son campos obligatorios',
          'Atención'
        );
        return;
      }

      if (this.email.indexOf('@', 0) < 1) {
        this.toastr.warning('El email debe contener el caracter @', 'Atención');
        return;
      }

      if (this.email.indexOf('.', 0) < 1) {
        this.toastr.warning('El email debe contener el caracter.@', 'Atención');
        return;
      }

      if (this.user.rols.length == 0) {
        this.toastr.warning(
          'El usuario debe tener asignado al menos un rol',
          'Atención'
        );
        return;
      }

      this.user.id = this.id;
      this.user.name = this.name;
      this.user.email = this.email;
      this.user.departmentId = 1;

      this.userService.updateUserData(this.user).subscribe(
        () => {
          this.userService.updateUserRols(this.user).subscribe(
            () => {
              this.toastr.success('Usuario modificado con exito');
              this.router.navigateByUrl('User');
            },
            (err: any) => {
              this.toastr.error('Error al asignar los roles al usuario');
              return;
            }
          );
        },
        (addErr: any) => {
          this.toastr.error(
            'Solo los usuarios admin pueden modificar usuarios'
          );
          return;
        }
      );
    } catch (err) {
      this.toastr.error('Error inesperado al modificar el usuario');
    }
  }
}
