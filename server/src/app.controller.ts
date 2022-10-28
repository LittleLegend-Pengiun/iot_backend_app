import { Controller, Get, HttpCode, Post, Res, Req } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Config } from 'src/mqtt/mqtt.config';
import { MqttService } from './mqtt/mqtt.service';

@Controller()
export class AppController {
  settings: any
  constructor(private mqttService: MqttService) {
    this.settings = (new Config).settings
  }

  @Get('/get-all-data')
  @HttpCode(200)
  async getAllData(): Promise<any> {
    const httpServices = new HttpService;
    const ledStatus = await httpServices.axiosRef.get(
      `https://io.adafruit.com//api/v2/${this.settings.username}/feeds/${this.settings.feedKey.led}/data`
    );

    return {
        led: ledStatus.data
    }
  }
  
  @Post('/update-device-status')
  async updateData(@Req() req , @Res() res) {
    let feedID: string = undefined;
    if (req.body.device == "led") feedID = this.settings.feedKeyDetail.led;
    else if (req.body.device == "pump") feedID = this.settings.feedKeyDetail.pump;
    this.mqttService.publish(`${this.settings.username}/feeds/${feedID}`, req.body.deviceStatus, (err) => {
        if (err) return res.status(201).send(err.toString());
        return res.status(200).send();
    });
  }
}
