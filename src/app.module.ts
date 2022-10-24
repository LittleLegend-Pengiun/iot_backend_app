import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MainController } from './controller/main/main.controller';
import { SocketioGateway } from './gateway/socketio.gateway';
import { MqttService } from './services/mqtt/mqtt.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [MainController],
  providers: [MqttService, SocketioGateway],
})
export class AppModule {}