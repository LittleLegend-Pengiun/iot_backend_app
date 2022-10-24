import { Injectable, OnModuleInit } from '@nestjs/common';
import { Settings } from './mqtt.config';

@Injectable()
export class MqttService implements OnModuleInit {
    private mqttClient;
    settings: Settings;

    onModuleInit() {
        const host = process.env.ADAFRUIT_SERVER;
        const port = process.env.MQTT_PORT;
        console.log(host, port);
        return [];
    }
}
