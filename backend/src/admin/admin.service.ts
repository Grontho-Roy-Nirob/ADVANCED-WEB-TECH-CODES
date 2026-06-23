import { Injectable } from '@nestjs/common';
import { AdminDTO } from './admin.dto';

@Injectable()
export class AdminService {

   // @Query এর জন্য — name,id দিয়ে filter করে
  getAdminByIdAndName(id: number, name: string): object {
    return {
      id: id,
      name: name,
      message: 'Admin found successfully',
    };
  }

  // Admin related business logic will be implemented here
  getAdmin(): object {
    return {
      name: 'admin',
      Id: 1,
    };
  }

  // @Param এর জন্য — id দিয়ে admin খোঁজে
  getAdminById(id: number): object {
    return { message: `Admin found with ID: ${id}`, Id: id };
  }

  // @Query এর জন্য — role দিয়ে filter করে
  getAdminByRole(role: string): object {
    return { message: `Admins with role: ${role || 'all'}` };
  }

  // @Body এর জন্য — নতুন admin তৈরি করে
  createAdmin(data: AdminDTO): object {
    return {
      message: 'Admin created successfully',
      data,
    };
  }
}
