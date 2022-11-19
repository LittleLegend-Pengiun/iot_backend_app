'use strict'
import { config } from '../utils/utils';
import get from 'axios';
import { FastifyRequest } from 'fastify/types/request';
import { FastifyReply } from 'fastify/types/reply';
import { mqttInit, mqttPublish } from '../services/mqtt/mqtt.service';

const client = mqttInit();

const getAllData = async () => {
  const dict: Object = {};
  for (let key of config.settings.feedKey) {
    try {
      let status = await get(
        `https://io.adafruit.com//api/v2/${config.settings.username}/feeds/${key}/data`
      );
      dict[`${key.slice(4)}` as keyof typeof dict] = status.data;
    } catch (err) {
      console.log(`Error: ${err}; key: ${key}`);
    }
  }

  return dict;
}

const getAllChartData = async (req: FastifyRequest, res: FastifyReply) => {
  const dict: Object = {};
  const re: any = req;
  let hoursToGet: string
  const hours = re.params.hours;
  if (hours == 0) 
    hoursToGet = "";
  else
    hoursToGet = "?hours=" + hours.toString();
  for (let key of config.settings.feedKey) {
    try {
      let status = await get(
        `https://io.adafruit.com//api/v2/${config.settings.username}/feeds/${key}/data/chart${hoursToGet}`
      );
      dict[`${key.slice(4)}` as keyof typeof dict] = status.data.data;
    } catch (err) {
      console.log(`Error: ${err}; key: ${key}`);
    }
  }

  return dict; 
}

const updateDeviceStatus = async (req: FastifyRequest, res: FastifyReply) => {
  let feedID: string = "";
  const body: any = req.body;
  if (body.device == "led") 
    feedID = config.settings.feedKeyDetail.led;
  else if (body.device == "pump") 
    feedID = config.settings.feedKeyDetail.pump;
  else if (body.device == "temp") 
    feedID = config.settings.feedKeyDetail.temp;
  else if (body.device == "humi") 
    feedID = config.settings.feedKeyDetail.humi;
    
  mqttPublish(
    client,
    `${config.settings.username}/feeds/${feedID}`, 
    body.deviceStatus, 
    (err) => {
    if (err) return res.status(201).send(err.toString());
    return res.status(200).send();
  });
}

export const controller = {
  getAllData: getAllData,
  getAllChartData: getAllChartData,
  updateDeviceStatus: updateDeviceStatus
}