import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { error, info } from 'console';
import { connect, MqttClient } from 'mqtt';
import { Config } from './mqtt.config';

@Injectable()
export class MqttService implements OnModuleInit {
    mqttClient: MqttClient;

    onModuleInit() {
        const settings = (new Config).settings;
        const httpServices = new HttpService;
        this.mqttClient = connect({
            connectTimeout: 4000,
            host: process.env.ADAFRUIT_SERVER,
            port: parseInt(process.env.MQTT_PORT),
            username: settings.username,
            password: settings.activeKey
        });

        this.mqttClient.on("connect", () => {
            info("Connect successfull!")
            for (let topic of settings.clientTopics) {
                try {
                    this.mqttClient.subscribe(topic);
                    console.log('Subcribe topic ' + topic);
                } catch (err) {
                    console.log(`Error subcribing topic ${topic}`);
                }
            }
        });

        this.mqttClient.on("message", async (feedID, data, _) => {
            console.log(`${feedID}`)
            console.log(`Data received from ${feedID}: ${data}`);
            // emit to server
            let new_data = await httpServices.axiosRef.get(
                `https://io.adafruit.com/api/v2/${settings.username}/feeds/${feedID}/data`
            );
            console.log(
                "new_data", { feedID: feedID, data: new_data.data[0] }
            );
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