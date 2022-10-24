import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

import { AppController } from './app.controller';
import { AdminsController } from './admins/admins.controller';
import { SocketIoGateway } from './gateway/socket-io.gateway';
import { MqttService } from './mqtt/mqtt.service';

@Module({
  imports: [UsersModule],
  controllers: [AppController, AdminsController],
  providers: [SocketIoGateway, MqttService],
})
export class AppModule {}
