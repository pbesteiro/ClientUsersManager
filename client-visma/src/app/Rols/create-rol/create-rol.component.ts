import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Permission } from 'src/app/models/permission.model';
import { Rol } from 'src/app/models/rol.model';
import { LogService } from 'src/app/services/log.service';
import { PermissionService } from 'src/app/services/permission.service';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-create-rol',
  templateUrl: './create-rol.component.html',
  styleUrls: ['./create-rol.component.css'],
})
export class CreateRolComponent implements OnInit {
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

      this.rolService.add(this.rol).subscribe(
        (newRol:Rol) => {
          this.rol.id=newRol.id;
          this.rolService.updateRolPermission(this.rol).subscribe(
            () => {
              this.toastr.success('Rol creado con exito');
              this.router.navigateByUrl('Rol');
            },
            (err: any) => {
              this.toastr.error('Error al asignar los permisos al rol');
              return;
            }
          );
        },
        (addErr: any) => {
          this.toastr.error('Solo los usuarios admin puede crear nuevos roles');
          return;
        }
      );
    } catch (err) {
      this.toastr.error('Error inesperado al crear el rol');
    }
  }
}
