import { config } from '../../utils/utils';
import * as dotenv from 'dotenv';
import { MqttClient, connect } from 'mqtt';
import get from 'axios';

let socket: any;
export const setSocket = (Socket: any) => {
    socket = Socket;
}

export const mqttInit = () => {
    const client = connect({
        connectTimeout: 4000,
        host: process.env.ADAFRUIT_SERVER,
        port: parseInt(process.env.MQTT_PORT || ""),
        username: config.settings.username,
        password: config.settings.activeKey
    });

    client.on("connect", (err: Error) => {
        if (err.message) {
            console.log(err.message);
            return;
        }

        console.log("Connected!")

        for (let topic of config.settings.clientTopics) {
            try {
                client.subscribe(`${config.settings.username}/feeds/${topic}`, () => {
                    console.log('Subcribe topic ' + topic);
                });
            } catch (err) {
                console.log(`Error subcribing topic ${topic}`);
            }
        }
    });

    client.on("message", async (topic: any, message: any, _) => {
        console.log(`Data received from ${topic}: ${message}`);
        // emit to server
    
        let new_data = await get(
            `https://io.adafruit.com/api/v2/${topic}/data`
        );

        // Send data realtime
        socket.emit(
            "new_data", { feedID: topic, data: new_data.data[0] }
        );
    });

    return client;
}

export const mqttPublish = (client: MqttClient, topic: string, payload: string, handler = (err: Error) => {}) => {
    try {
        if (topic == undefined || payload == undefined) {
            handler(Error("Cannot publish data!"));
            return;
        }
        client.publish(topic, payload);
    } catch (err: any) {
        handler(err);
        return;
    }
}

dotenv.config();