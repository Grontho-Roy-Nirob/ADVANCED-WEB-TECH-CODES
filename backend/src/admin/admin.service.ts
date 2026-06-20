import { Injectable } from "@nestjs/common";

@Injectable()
export class AdminService{
    // Admin related business logic will be implemented here
    getAdmin(): object {
         return {
            name: 'admin',
            Id: 1,
         };
    }

    // @Param এর জন্য — id দিয়ে admin খোঁজে
    getAdminById(id: string): object {
         return { message: `Admin found with ID: ${id}`, Id: id };
    } 

    // @Query এর জন্য — role দিয়ে filter করে
    getAdminByRole(role: string): object {
        return { message: `Admins with role: ${role || 'all'}` };
    }

    // @Body এর জন্য — নতুন admin তৈরি করে
    createAdmin(data: { name: string; role: string }): object {
        return { message: 'Admin created successfully', data };
    }
}