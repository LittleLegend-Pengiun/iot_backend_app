import { Injectable, OnModuleInit } from '@nestjs/common';
import { error, info } from 'console';
import { connect, MqttClient } from 'mqtt';
import { Settings } from './mqtt.config';

@Injectable()
export class MqttService implements OnModuleInit {
    mqttClient: MqttClient;
    settings: Settings;

    onModuleInit() {
        this.settings = new Settings();
        this.mqttClient = connect({
            connectTimeout: 4000,
            host: process.env.ADAFRUIT_SERVER,
            port: parseInt(process.env.MQTT_PORT),
            username: process.env.ADAFRUIT_USERNAME,
            password: process.env.ADAFRUIT_KEY
        });

        this.mqttClient.on("connect", () => {
            info("Connect successfull!")
        });

        this.mqttClient.on("error", () => {
            error(`Error in connecting to Adafruit! Info: host ${process.env.ADAFRUIT_SERVER}, port: ${process.env.MQTT_PORT}`)
        });
        //console.log(host, port);
        //return [];
    }

    publish(topic: string, payload: string): string {
        info(`Publishing to ${topic}`);
        this.mqttClient.publish(topic,payload);
        return `Publishing to ${topic}`;
    }
}