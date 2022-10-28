import { Controller, Get, HttpCode, Post, Res, Req } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Config } from 'src/mqtt/mqtt.config';
import { MqttService } from './mqtt/mqtt.service';

@Controller()
export class AppController {
  settings: any;
  httpServices: any;
  constructor(private mqttService: MqttService) {
    this.settings = (new Config).settings;
    this.httpServices = new HttpService;
  }

  @Get('/get-all-data')
  @HttpCode(200)
  async getAllData(): Promise<any> {
    const dict: Object = {};
    for (let key of this.settings.feedKey) {
      try {
        let status = await this.httpServices.axiosRef.get(
          `https://io.adafruit.com//api/v2/${this.settings.username}/feeds/${key}/data`
        );
        dict[`${key.substr(4)}`] = status.data;
      } catch (err) {
        console.log(`Error: ${err}; key: ${key}`);
      }
    }

    return dict;
  }

  @Get('/get-all-chart-data')
  @HttpCode(200)
  async getAllChartData(): Promise<any> {
    const dict: Object = {};
    for (let key of this.settings.feedKey) {
      try {
        let status = await this.httpServices.axiosRef.get(
          `https://io.adafruit.com//api/v2/${this.settings.username}/feeds/${key}/data/chart?hours=24`
        );
        dict[`${key.substr(4)}`] = status.data.data;
      } catch (err) {
        console.log(`Error: ${err}; key: ${key}`);
      }
    }

    return dict;
    
  }
  
  @Post('/update-device-status')
  async updateData(@Req() req, @Res() res) {
    let feedID: string = undefined;
    if (req.body.device == "led") feedID = this.settings.feedKeyDetail.led;
    else if (req.body.device == "pump") feedID = this.settings.feedKeyDetail.pump;
    this.mqttService.publish(`${this.settings.username}/feeds/${feedID}`, req.body.deviceStatus, (err) => {
        if (err) return res.status(201).send(err.toString());
        return res.status(200).send();
    });
  }
}
