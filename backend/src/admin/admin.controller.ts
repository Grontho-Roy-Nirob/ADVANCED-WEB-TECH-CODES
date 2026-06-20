import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @Param — Route parameter থেকে id extract করে
  //URL example: http://localhost:7000/admin/5
  @Get(':id')
  getAdminById(@Param('id') id: string): object {
    return this.adminService.getAdminById(id);
  }

  // @Query — Query parameter থেকে role extract করে
  // URL example: http://localhost:7000/admin
  // URL example: http://localhost:7000/admin?role=superadmin
  @Get()
  getAdmin(@Query('role') role: string): object {
    if (role) {
      return this.adminService.getAdminByRole(role);
    }
    return this.adminService.getAdmin();
  }

  // @Body — Request body থেকে data extract করে
  @Post()
  createAdmin(@Body() body: {name: string; role: string}): object {
      return this.adminService.createAdmin(body);
  }
}
