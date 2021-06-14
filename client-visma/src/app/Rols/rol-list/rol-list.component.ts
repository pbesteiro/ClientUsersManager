import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rol } from 'src/app/models/rol.model';
import { LogService } from 'src/app/services/log.service';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-rol-list',
  templateUrl: './rol-list.component.html',
  styleUrls: ['./rol-list.component.css'],
})
export class RolListComponent implements OnInit {
  constructor(
    private rolService: RolService,
    private logService: LogService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  rols: Rol[] = [];

  ngOnInit(): void {
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
    this.router.navigateByUrl('/');
  }

  goToCreate() {
    this.router.navigateByUrl('Rol/create');
  }

  deleteRol(id: number, index: number) {
    try {
       this.rolService.delete(id).subscribe(

        ()=>{
          this.rols.splice(index, 1);
          this.toastr.success('Rol eliminado correctamente.', 'Operación Existosa');
          return;
        },
        (delErr:any)=>{
          this.toastr.success('Error al intentar eliminar el Rol', 'Error');
          return;
        }        
      );
     
    } catch (err) {
      this.toastr.success(err, 'Error');
    }
  }
}
