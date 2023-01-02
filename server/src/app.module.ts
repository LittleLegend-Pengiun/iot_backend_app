import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AdminsController } from './admins/admins.controller';
import { SocketIoGateway } from './gateway/socket-io.gateway';
import { MqttService } from './mqtt/mqtt.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { VerifyGuard } from './guards/verify.guard';
import { AutomationSchedulerService } from './schedulers/automation-scheduler/automation-scheduler.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UsersModule,
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: 'main.env'
    })
  ],
  controllers: [AppController, AdminsController],
  providers: [SocketIoGateway, MqttService, VerifyGuard, AutomationSchedulerService],
})
export class AppModule { }
