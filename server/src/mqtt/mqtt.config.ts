import { Global, Module } from "@nestjs/common";

@Global()
@Module({
    exports: [Config]
})
export class Config {
    clientTopics = {
        led: "bbc-led"
    };
    settings = {
        username: process.env.ADAFRUIT_USERNAME,
        activeKey: process.env.ADAFRUIT_KEY,
        clientTopics: [
            this.clientTopics.led
        ],
        feedKey: {
            led: "bbc-led"
        },
        feedKeyDetail: this.clientTopics
    }
}