import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminsController } from './admins/admins.controller';

@Module({
  imports: [UsersModule],
  controllers: [AppController, AdminsController],
  providers: [AppService],
})
export class AppModule {}
