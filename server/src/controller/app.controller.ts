'use strict'
import { config } from '../utils/utils';
import * as axios from 'axios';

const getAllData = async () => {
  const dict: Object = {};
  let key: string
  for (key of config.settings.feedKey) {
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

export const controller = {
  getAllData: getAllData
}