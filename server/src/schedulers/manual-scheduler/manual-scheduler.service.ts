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
        let newValue: number= undefined, tempValue: number = undefined, humiValue: number = undefined,
            updateDeviceName: string = undefined,
            deviceValue: number = undefined,
            res: any;

       
        switch (deviceName) {
             //fan fules
            case `${this.settings.username}/feeds/bbc-temp`:
                tempValue = parseInt(message);

                res = await this.httpService.axiosRef.get(`https://io.adafruit.com//api/v2/${this.settings.username}/feeds/bbc-humi/data`);
                humiValue = parseInt(res.data[0].value);
                
                updateDeviceName = "bbc-fan";
                break;
            case `${this.settings.username}/feeds/bbc-humi`:
                res = await this.httpService.axiosRef.get(`https://io.adafruit.com//api/v2/${this.settings.username}/feeds/bbc-temp/data`);
                tempValue = parseInt(res.data[0].value);

                humiValue = parseInt(message);
                updateDeviceName = "bbc-fan";
                break;
            
            // buzzer rules
            case `${this.settings.username}/feeds/bbc-gas`:
                const gasValue = parseInt(message);
                if (gasValue > 700) {
                    newValue = 5;
                    updateDeviceName = "bbc-buzzer";
                } else if (gasValue < 400) {
                    newValue = 6;
                    updateDeviceName = "bbc-buzzer";
                } else return;
                break;

            default:
                return;
        }

        // Check fan conditions
        if (updateDeviceName == "bbc-fan") {
            if ((tempValue < 30) && (humiValue >= 90)) {
                newValue = 2;
            } else {
                newValue = 3;
            }
            
        }        
        res = await this.httpService.axiosRef.get(`https://io.adafruit.com//api/v2/${this.settings.username}/feeds/${updateDeviceName}/data`);

        deviceValue = parseInt(res.data[0].value);        

        if (newValue) {
            mqttService.publish(`${this.settings.username}/feeds/${updateDeviceName}`, String(newValue));
        }
        console.log(`Temp: ${tempValue}; humi: ${humiValue}; value: ${newValue}; deviceValue: ${deviceValue}`);
    }
}