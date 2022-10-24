import { Controller, Get } from '@nestjs/common';

@Controller('admins')
export class AdminsController {
    @Get()
    index(): string {
      return 'Admin page';
    }
}
