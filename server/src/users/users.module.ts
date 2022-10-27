import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabasesModule } from '../databases/databases.module';
import { userProviders } from 'src/models/user.repository.providers';

@Module({
    imports: [DatabasesModule.forRoot()],
    controllers: [UsersController],
    providers: [UsersService, ...userProviders],
    exports: [UsersService, DatabasesModule]
})
export class UsersModule {}
