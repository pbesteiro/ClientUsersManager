import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Permission } from 'src/app/models/permission.model';
import { Rol } from 'src/app/models/rol.model';
import { LogService } from 'src/app/services/log.service';
import { PermissionService } from 'src/app/services/permission.service';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-update-rol',
  templateUrl: './update-rol.component.html',
  styleUrls: ['./update-rol.component.css'],
})
export class UpdateRolComponent implements OnInit {
  rol: Rol = new Rol();
  id: number;
  permissions: Permission[];
  rolDescription: string;

  constructor(
    private route: ActivatedRoute,
    private logService: LogService,
    private rolService: RolService,
    private permissionService: PermissionService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      //if i got an set the rol information
      this.rolService.get(this.id).subscribe(
        (res: Rol) => {
          this.logService.log(res);
          this.rol = res;
          this.rolDescription = this.rol.description;
        },
        (error: any) => {
          this.logService.log(error);
          this.toastr.error('Error al buscar los roles.', 'Error');
        }
      );
    }

    //always get all the permission
    this.permissionService.getAll().subscribe(
      (res: Permission[]) => {
        this.permissions = res;
        this.logService.log(this.permissions);
      },
      (error: any) => {
        this.toastr.error('Error al buscar los permisos.', 'Error');
      }
    );
  }

  hasPermissionAssigned(permission: Permission): boolean {
    let permissionSearched = this.rol.permissions.filter(
      (x) => x.id === permission.id
    );
    return permissionSearched.length != 0;
  }

  back() {
    this.router.navigateByUrl('Rol');
  }

  updateRolPermissions(checkState: any, permission: Permission) {
    checkState.stopPropagation();
    if (!checkState.currentTarget.checked) {
      this.rol.permissions.forEach((element, index) => {
        if (element.id == permission.id) {
          this.rol.permissions.splice(index, 1);
          return;
        }
      });
    } else {
      this.rol.permissions.push(permission);
    }
  }

  save() {
    try {
      if (!this.rolDescription) {
        this.toastr.warning(
          'El nombre del rol es un campo obligatorio',
          'Atención'
        );
        return;
      }

      if (this.rol.permissions.length == 0) {
        this.toastr.warning(
          'Para crear un rol debe seleccionar al menos un permiso',
          'Atención'
        );
        return;
      }

      this.rol.description = this.rolDescription;
      this.rol.id = this.id;

      this.rolService.updateRolData(this.rol).subscribe(
        () => {
          this.rolService.updateRolPermission(this.rol).subscribe(
            () => {
              this.toastr.success('Rol modificado con exito');
              this.router.navigateByUrl('Rol');
            },
            (err: any) => {
              this.toastr.error('Error al asignar los permisos al rol');
              return;
            }
          );
        },
        (addErr: any) => {
          this.toastr.error('Solo los usuarios admin puede modificar roles');
          return;
        }
      );
    } catch (err) {
      this.toastr.error('Error inesperado al modificar el rol');
    }
  }
}
