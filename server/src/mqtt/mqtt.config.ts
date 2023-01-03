import { Global, Module } from "@nestjs/common";

@Global()
@Module({
    exports: [Config]
})
export class Config {
    clientTopics = {
        buzzer: "bbc-buzzer",
        curtain: "bbc-curtain",
        fan: "bbc-fan",
        gas: "bbc-gas",
        humi: "bbc-humi",
        led: "bbc-led",
        temp: "bbc-temp"
    };
    settings = {
        username: process.env.ADAFRUIT_USERNAME,
        activeKey: process.env.ADAFRUIT_KEY,
        clientTopics: [
            this.clientTopics.buzzer,
            this.clientTopics.curtain,
            this.clientTopics.fan,
            this.clientTopics.gas,
            this.clientTopics.led,
            this.clientTopics.temp,
            this.clientTopics.humi
        ],
        feedKey: [
            "bbc-buzzer",
            "bbc-curtain",
            "bbc-fan",
            "bbc-gas",
            "bbc-humi",
            "bbc-led",
            "bbc-temp"
        ],
        feedKeyDetail: this.clientTopics,
        timeSettings: {
            morningHour: 5,
            morningMinute: 30,
            nightHour: 10,
            nightMinute: 30
        }
    }
}