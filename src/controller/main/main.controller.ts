import { Controller, Get } from '@nestjs/common';
import { MqttService } from 'src/services/mqtt/mqtt.service';

@Controller('main')
export class MainController {
    @Get()
    async test(): Promise<MqttService[]> {
        return (new MqttService()).onModuleInit();
    }
}
