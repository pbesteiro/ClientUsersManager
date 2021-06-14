import { Rol } from "./rol.model";

export class User{
    
    id:number;
    name:string;
    email:string;
    password:string;
    rols:Rol[];
    departmentId:number;

    constructor(){
        this.id=0;
        this.name='';
        this.email='';
        this.rols=[];
        this.departmentId=1;
    }


}