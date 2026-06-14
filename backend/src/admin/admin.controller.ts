import { Controller, Get } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller()
export class AdminController{
    constructor(private readonly adminService : AdminService){}

    // Admin related API endpoints will be defined here
    @Get()
    getAdmin() : object{
         return this.adminService.getAdmin();
    }
}