import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabasesModule } from '../databases/databases.module';
import { userProviders } from 'src/models/user.repository.providers';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [DatabasesModule.forRoot()],
    controllers: [UsersController],
    providers: [UsersService, JwtService,...userProviders],
    exports: [UsersService, DatabasesModule]
})
export class UsersModule {}
