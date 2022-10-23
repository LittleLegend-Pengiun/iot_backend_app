import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketioGateway } from './gateway/socketio.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SocketioGateway],
})
export class AppModule {}
