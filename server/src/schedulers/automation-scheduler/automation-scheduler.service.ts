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

    // Every hours at :00s
    @Cron('0 0 * * * *')
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
        /*
        // Some fan rules
        feedID = this.settings.feedKeyDetail.fan;
        let temp = parseInt(dict["temp"][0]["value"]);
        let humi = parseInt(dict["humi"][0]["value"]);
        let fanState = parseInt(dict["fan"][0]["value"]);
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
        // console.log("fanState", fanState);
        // console.log("parseInt(value)", parseInt(value));
        if (value && parseInt(value) !== fanState) {
            this.mqttService.publish(`${this.settings.username}/feeds/${feedID}`, value);
        }
        */
        // Some curtain rules
        feedID = this.settings.feedKeyDetail.curtain;
        let curtainState = parseInt(dict["curtain"][0]["value"])
        let timeAPIRes = await this.httpService.axiosRef.get("http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh");

        let curHCMDateTime = new Date(timeAPIRes.data.datetime);
        let curHCMDateHours = (curHCMDateTime.getHours() + 7) % 24; // ICT time
        let curHCMDateMinutes = curHCMDateTime.getMinutes();

        // console.log("curHCMDateHours", curHCMDateHours);
        // console.log("this.settings.timeSettings.morningHour", this.settings.timeSettings.morningHour);
        // console.log("this.settings.timeSettings.nightHour", this.settings.timeSettings.nightHour);
        // console.log("curHCMDateMinutes", curHCMDateMinutes);
        // console.log("this.settings.timeSettings.morningMinute", this.settings.timeSettings.morningMinute);
        // console.log("this.settings.timeSettings.nightMinute", this.settings.timeSettings.nightMinute);

        if (
            (
                curHCMDateHours > this.settings.timeSettings.morningHour
                || curHCMDateHours == this.settings.timeSettings.morningHour && curHCMDateMinutes == this.settings.timeSettings.morningMinute
            )
            &&
            (
                curHCMDateHours < this.settings.timeSettings.morningHour
                || curHCMDateHours == this.settings.timeSettings.morningHour && curHCMDateMinutes < this.settings.timeSettings.morningMinute
            )
        ) {
            // In morning hours
            if (curtainState == 8) {
                value = '7';
                // console.log("[Automation]: Curtain open");
                this.mqttService.publish(`${this.settings.username}/feeds/${feedID}`, value);
            }
        } else {
            // In night hours
            if (curtainState == 7) {
                value = '8';
                // console.log("[Automation]: Curtain close");
                this.mqttService.publish(`${this.settings.username}/feeds/${feedID}`, value);
            }
        }

    }
}
