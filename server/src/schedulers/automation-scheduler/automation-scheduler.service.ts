import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MqttService } from 'src/mqtt/mqtt.service';
import { Config } from 'src/mqtt/mqtt.config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AutomationSchedulerService {
    settings: any;
    constructor(private mqttService: MqttService, private httpService: HttpService) {
        this.settings = (new Config).settings;
    }

    // Every minute at :59s
    @Cron('59 * * * * *')
    async handleCron() {
        await this.automation();
    }

    async automation() {
        let dict = {};
        let feedID = '';
        let value = "";
        for (let key of this.settings.feedKey) {
            try {
                let status = await this.httpService.axiosRef.get(
                    `https://io.adafruit.com//api/v2/${this.settings.username}/feeds/${key}/data`
                );
                dict[`${key.substr(4)}`] = status.data;
            } catch (err) {
                console.log(`Error: ${err}; key: ${key}`);
            }
        }

        // Some fan rules
        feedID = this.settings.feedKeyDetail.fan;
        let temp = parseInt(dict["temp"][0]["value"]);
        let humi = parseInt(dict["humi"][0]["value"]);
        if (temp > 32) {
            value = "2";
        } else if (temp < 27) {
            value = "3";
        } else {
            if (humi > 30) {
                value = "3";
            } else if (humi < 25) {
                value = "2";
            } else {
                value = null;
            }
        }
        if (value) {
            this.mqttService.publish(`${this.settings.username}/feeds/${feedID}`, value);
        }
    }
}
