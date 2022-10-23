import { Module } from '@nestjs/common';
import { MainController } from './controller/main/main.controller';
import { SocketioGateway } from './gateway/socketio.gateway';
import { MqttService } from './services/mqtt/mqtt/mqtt.service';

@Module({
  imports: [],
  controllers: [MainController],
  providers: [MqttService, SocketioGateway],
})
export class AppModule {}