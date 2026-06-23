import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  ValidationPipe,
  UsePipes,
  UseInterceptors,
  UploadedFile,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDTO } from './admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @Query — Query parameter থেকে role extract করে
  // URL example: http://localhost:7000/admin/getbyidandname?id=1&name=rahim
  // URL example: http://localhost:3000/admin/getbyidandname?name=rahim&id=1
  @Get('getbyidandname')
  getAdminByIdAndName(
    @Query('name') name: string,
    @Query('id') id: number,
  ): object {
    return this.adminService.getAdminByIdAndName(id, name);
  }

  // URL example: http://localhost:7000/admin/getimage/1782185660882git.jpeg
  @Get('/getimage/:name')
  getImages(@Param('name') name: string, @Res() res: any) {
    res.sendFile(name, { root: './uploads' });
  }

  // @Param — Route parameter থেকে id extract করে
  //URL example: http://localhost:7000/admin/5
  @Get(':id')
  getAdminById(@Param('id', ParseIntPipe) id: number): object {
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
  // URL example: http://localhost:7000/admin/create
  @Post('create')
  @UsePipes(new ValidationPipe()) // Apply the validation
  @UseInterceptors(
    FileInterceptor('myfile', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 30000 },
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  createAdmin(
    @Body() mydata: AdminDTO,
    @UploadedFile() myfile: Express.Multer.File,
  ): object {
    console.log(myfile.originalname);
    mydata.filename = myfile.filename;
    return this.adminService.createAdmin(mydata);
  }
}
