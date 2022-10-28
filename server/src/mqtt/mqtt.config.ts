import { Global, Module } from "@nestjs/common";

@Global()
@Module({
    exports: [Config]
})
export class Config {
    clientTopics = {
        led: "bbc-led",
        pump: "bbc-pump",
        temp: "bbc-temp",
        humi: "bbc-humi"
    };
    settings = {
        username: process.env.ADAFRUIT_USERNAME,
        activeKey: process.env.ADAFRUIT_KEY,
        clientTopics: [
            this.clientTopics.led,
            this.clientTopics.pump,
            this.clientTopics.temp,
            this.clientTopics.humi
        ],
        feedKey: [
            "bbc-led",
            "bbc-pump",
            "bbc-temp",
            "bbc-humi"
        ],
        feedKeyDetail: this.clientTopics
    }
}