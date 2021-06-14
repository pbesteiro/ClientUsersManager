import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/models/rol.model';
import { LogService } from 'src/app/services/log.service';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  rol:Rol=new Rol();
  id:number;
  constructor(private route: ActivatedRoute
    ,private logService: LogService
    ,private rolService: RolService
    ,private router:Router
    ,private toastr: ToastrService) { }


 
  ngOnInit(): void {
    
    this.id=this.route.snapshot.params['id'];
   
    if(!this.id){
      this.toastr.error('No se encontro el parámetro id', 'Error');
      return;
    }
    this.rolService
    .get(this.id)
    .subscribe((res: Rol) => {
      this.rol=res;
      this.logService.log(this.rol);
    },
    (error: any)=>{
      this.toastr.error('Error al buscar los roles.', 'Error');

    }
    ); 
    
  }


  back(){
    this.router.navigateByUrl('Rol');
  }


}
