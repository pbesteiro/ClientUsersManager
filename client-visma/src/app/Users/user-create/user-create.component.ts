import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rol } from 'src/app/models/rol.model';
import { User } from 'src/app/models/user.model';
import { LogService } from 'src/app/services/log.service';
import { RolService } from 'src/app/services/rol.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styles: [],
})
export class UserCreateComponent implements OnInit {
  user: User = new User();
  id: number;
  rols: Rol[];
  name: string;
  email: string;
  passwordRepeat: string;
  password: string;

  constructor(
    private route: ActivatedRoute,
    private logService: LogService,
    private rolService: RolService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
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
      if (!this.name || !this.email || !this.password) {
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

      if (this.password != this.passwordRepeat) {
        this.toastr.warning('Los password no coinciden', 'Atención');
        return;
      }

      if (this.user.rols.length == 0) {
        this.toastr.warning(
          'Para crear un usuario debe seleccionar al menos un rol',
          'Atención'
        );
        return;
      }

      this.user.name = this.name;
      this.user.email = this.email;
      this.user.departmentId = 1;
      this.user.password = this.password;

      this.userService.add(this.user).subscribe(
        () => {
          this.userService.updateUserRols(this.user).subscribe(
            () => {
              this.toastr.success('Usuario creado con exito');
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
            'Solo los usuarios admin puede crear nuevos usuarios'
          );
          return;
        }
      );
    } catch (err) {
      this.toastr.error('Error inesperado al crear el usuario');
    }
  }
}
