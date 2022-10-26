import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { Config } from 'src/mqtt/mqtt.config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/get-all-data')
  @HttpCode(200)
  async getAllData(): Promise<any> {
    //const maxRecord = 15;
    const settings = (new Config).settings;
    const httpServices = new HttpService();
    const ledStatus = await httpServices.axiosRef.get(
      `https://io.adafruit.com//api/v2/${settings.username}/feeds/${settings.feedKey.led}/data`
    );

    return {
        led: ledStatus.data
    }
  }
}
