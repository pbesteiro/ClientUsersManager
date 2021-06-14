import { Permission } from "./permission.model";

export class Rol {
    id: number;
    description: string; 
    permissions: Permission[];
  
    constructor() {
      this.description = '';
      this.permissions = [];
      this.id =0;
    }
  }
  