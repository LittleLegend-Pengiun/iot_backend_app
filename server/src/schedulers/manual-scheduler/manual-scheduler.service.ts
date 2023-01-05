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
        let newValue: number, tempValue: number, humiValue: number,
            updateDeviceName: string;

        //fan fules
        if (deviceName == `${this.settings.username}/feeds/bbc-temp`)
        {
            tempValue = parseInt(message);

            const res = await this.httpService.axiosRef.get(`https://io.adafruit.com//api/v2/${this.settings.username}/feeds/bbc-humi/data`);
            humiValue = parseInt(res.data[0].value);
            
            updateDeviceName = "bbc-fan";
        }

        if (deviceName == `${this.settings.username}/feeds/bbc-humi`)
        {
            const res = await this.httpService.axiosRef.get(`https://io.adafruit.com//api/v2/${this.settings.username}/feeds/bbc-temp/data`);
            tempValue = parseInt(res.data[0].value);

            humiValue = parseInt(message);
            updateDeviceName = "bbc-fan";
        }

        // Check conditions
        if (updateDeviceName == "bbc-fan") {
            if (tempValue > 32) {
                newValue = 2;
            } else if (tempValue < 27) {
                newValue = 3;
            } else if (humiValue > 30) {
                newValue = 3;
            } else if (humiValue < 25) {
                newValue = 2;
            } else {
                newValue = null;
            }
        }
        
        const deviceValue: number = parseInt((await this.httpService.axiosRef.get(`https://io.adafruit.com//api/v2/${this.settings.username}/feeds/${updateDeviceName}/data`)).data[0].value);

        if (newValue && newValue !== deviceValue) {
            mqttService.publish(`${this.settings.username}/feeds/${updateDeviceName}`, String(newValue));
        }
    }
}