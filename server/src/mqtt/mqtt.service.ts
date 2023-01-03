import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { error, info } from 'console';
import { connect, MqttClient } from 'mqtt';
import { SocketIoGateway } from 'src/gateway/socket-io.gateway';
import { Config } from './mqtt.config';

@Injectable()
export class MqttService implements OnModuleInit {
    mqttClient: MqttClient;
    settings: any;
    constructor(private socketIO: SocketIoGateway, private httpServices: HttpService) {
        this.settings = (new Config).settings;
    }

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
                    this.mqttClient.subscribe(`${settings.username}/feeds/${topic}`, () => {
                        console.log('Subcribe topic ' + topic);
                    });
                } catch (err) {
                    console.log(`Error subcribing topic ${topic}`);
                }
            }
        });

        this.mqttClient.on("message", async (topic: any, message: any, _) => {
            console.log(`Data received from ${topic}: ${message}`);
            // emit to server
            let new_data = await httpServices.axiosRef.get(
                `https://io.adafruit.com/api/v2/${topic}/data`
            );

            // Send data realtime to Next Client with Websocket
            this.socketIO.server.emit(
                "new_data", { feedID: topic, data: new_data.data[0] }
            );
            console.log("new change in new data", topic, new_data.data[0])
        });

        this.mqttClient.on("error", () => {
            error(`Error in connecting to Adafruit! Info: host ${process.env.ADAFRUIT_SERVER}, port: ${process.env.MQTT_PORT}, pass: ${settings.activeKey}`)
        });
    }

    publish(topic: string, payload: string, callback = (err) => { }) {
        try {
            if (topic == undefined || payload == undefined) {
                callback(Error("Cannot publish data!"));
                return;
            }
            this.mqttClient.publish(topic, payload);
        } catch (err) {
            callback(err);
            return;
        }
        callback(undefined);
    }
}