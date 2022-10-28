import { Global, Module } from "@nestjs/common";

@Global()
@Module({
    exports: [Config]
})
export class Config {
    clientTopics = {
        led: "bbc-led",
        fan: "bbc-fan"
    };
    settings = {
        username: process.env.ADAFRUIT_USERNAME,
        activeKey: process.env.ADAFRUIT_KEY,
        clientTopics: [
            this.clientTopics.led,
            this.clientTopics.fan
        ],
        feedKey: {
            led: "bbc-led",
            fan: "bbc-fan"
        },
        feedKeyDetail: this.clientTopics
    }
}