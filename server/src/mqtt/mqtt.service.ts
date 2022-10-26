import { Injectable, OnModuleInit } from '@nestjs/common';
import { error, info } from 'console';
import { connect, MqttClient } from 'mqtt';
import { Config } from './mqtt.config';

@Injectable()
export class MqttService implements OnModuleInit {
    mqttClient: MqttClient;

    onModuleInit() {
        const config = new Config();
        this.mqttClient = connect({
            connectTimeout: 4000,
            host: process.env.ADAFRUIT_SERVER,
            port: parseInt(process.env.MQTT_PORT),
            username: config.settings.username,
            password: config.settings.activeKey
        });

        this.mqttClient.on("connect", () => {
            info("Connect successfull!")
        });

        this.mqttClient.on("error", () => {
            error(`Error in connecting to Adafruit! Info: host ${process.env.ADAFRUIT_SERVER}, port: ${process.env.MQTT_PORT}`)
        });
    }

    publish(topic: string, payload: string): string {
        info(`Publishing to ${topic}`);
        this.mqttClient.publish(topic,payload);
        return `Publishing to ${topic}`;
    }
}