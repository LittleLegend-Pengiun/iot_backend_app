import { Controller, Get, HttpCode, Post, Res, Req, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Config } from 'src/mqtt/mqtt.config';
import { MqttService } from './mqtt/mqtt.service';
import { Request, Response } from 'express';
import { UseGuards } from '@nestjs/common';
import { VerifyGuard } from './guards/verify.guard';
import { UseFilters } from '@nestjs/common';
import { UnauthorizedExceptionFilter } from './filters/unauthorized-exception.filter';

@Controller()
export class AppController {
  settings: any;
  httpServices: any;
  constructor(private mqttService: MqttService) {
    this.settings = (new Config).settings;
    this.httpServices = new HttpService;
  }

  @Get('/get-all-data')
  @UseGuards(VerifyGuard)
  @UseFilters(UnauthorizedExceptionFilter)
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

  @Get('/get-all-chart-data/:hours')
  @UseGuards(VerifyGuard)     
  @UseFilters(UnauthorizedExceptionFilter)
  @HttpCode(200)
  async getAllChartData(@Param('hours') hours: number): Promise<any> {
    const dict: Object = {};
    let hoursToGet: string
    if (hours == 0) 
      hoursToGet = "";
    else
      hoursToGet = "?hours=" + hours.toString();
    for (let key of this.settings.feedKey) {
      try {
        let status = await this.httpServices.axiosRef.get(
          `https://io.adafruit.com//api/v2/${this.settings.username}/feeds/${key}/data/chart${hoursToGet}`
        );
        dict[`${key.substr(4)}`] = status.data.data;
      } catch (err) {
        console.log(`Error: ${err}; key: ${key}`);
      }
    }

    return dict; 
  }
  
  @Post('/update-device-status')
  @UseGuards(VerifyGuard)
  @UseFilters(UnauthorizedExceptionFilter)
  async updateData(@Req() req: Request, @Res() res: Response) {
    let feedID: string = undefined;
    if (req.body.device == "led") 
      feedID = this.settings.feedKeyDetail.led;
    else if (req.body.device == "pump") 
      feedID = this.settings.feedKeyDetail.pump;
    else if (req.body.device == "temp") 
      feedID = this.settings.feedKeyDetail.temp;
    else if (req.body.device == "humi") 
      feedID = this.settings.feedKeyDetail.humi;
    
    this.mqttService.publish(
      `${this.settings.username}/feeds/${feedID}`, req.body.deviceStatus, (err) => {
        if (err) return res.status(201).send(err.toString());
        return res.status(200).send();
    });
  }
}