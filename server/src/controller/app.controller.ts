'use strict'
import { config } from '../utils/utils';
import * as axios from 'axios';
import { FastifyReply, FastifyRequest } from 'fastify';

const getAllData = async () => {
  const dict: Object = {};
  for (let key of config.settings.feedKey) {
    try {
      let status = await axios.get(
        `https://io.adafruit.com//api/v2/${config.settings.username}/feeds/${key}/data`
      );
      dict[`${key.substr(4)}`] = status.data;
    } catch (err) {
      console.log(`Error: ${err}; key: ${key}`);
    }
  }

  return dict;
}

const getAllChartData = async (req: FastifyRequest, res: FastifyReply) => {
  const dict: Object = {};
  let hoursToGet: string
  const { hours } = req.params;
  if (hours == 0) 
    hoursToGet = "";
  else
    hoursToGet = "?hours=" + hours.toString();
  for (let key of config.settings.feedKey) {
    try {
      let status = await axios.get(
        `https://io.adafruit.com//api/v2/${config.settings.username}/feeds/${key}/data/chart${hoursToGet}`
      );
      dict[`${key.substr(4)}`] = status.data.data;
    } catch (err) {
      console.log(`Error: ${err}; key: ${key}`);
    }
  }

  return dict; 
}

export const controller = {
  getAllData: getAllData,
  getAllChartData: getAllChartData
}