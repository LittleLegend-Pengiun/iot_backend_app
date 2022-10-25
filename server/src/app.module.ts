import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AdminsController } from './admins/admins.controller';
import { SocketIoGateway } from './gateway/socket-io.gateway';
import { MqttService } from './mqtt/mqtt.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule, 
    ConfigModule.forRoot({
      envFilePath: 'main.env'
    })],
  controllers: [AppController, AdminsController],
  providers: [SocketIoGateway, MqttService, AppService],
})
export class AppModule {}
