import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { MqttClient } from 'mqtt';
import { Config } from 'src/mqtt/mqtt.config';

@Injectable()
export class ManualSchedulerService {
    settings: any;
    constructor(private httpService: HttpService) {
        this.settings = (new Config).settings;
    }

    async triggerAutomationWhenDeviceStatusChange(mqttService: MqttClient,topic: any, message: any) 
    {
        const deviceName = String(topic);
        let newValue: number, tempValue: number, humiValue: number;

        //fan fules
        const deviceValue: number = parseInt((await this.httpService.axiosRef.get(`https://io.adafruit.com//api/v2/${this.settings.username}/feeds/bbc-humi/data`)).data[0].value);

        if (deviceName == `${this.settings.username}/feeds/bbc-temp`)
        {
            tempValue = parseInt(message);

            const res = await this.httpService.axiosRef.get(`https://io.adafruit.com//api/v2/${this.settings.username}/feeds/bbc-humi/data`);
            humiValue = parseInt(res.data[0].value);
        }

        if (deviceName == `${this.settings.username}/feeds/bbc-humi`)
        {
            const res = await this.httpService.axiosRef.get(`https://io.adafruit.com//api/v2/${this.settings.username}/feeds/bbc-temp/data`);
            tempValue = parseInt(res.data[0].value);

            humiValue = parseInt(message);
        }

        // Check conditions
        if (tempValue > 32) {
            newValue = 2;
        } else if (tempValue < 27) {
            newValue = 3;
        } else {
            if (humiValue > 30) {
                newValue = 3;
            } else if (humiValue < 25) {
                newValue = 2;
            } else {
                newValue = null;
            }
        }

        if (newValue && newValue !== deviceValue) {
            mqttService.publish(`${this.settings.username}/feeds/bbc-fan`, String(newValue));
        }
    }
}