export class Settings {
    clientTopics: any
    settings: any

    constructor(){
        this.clientTopics = {
            led: "bbc-led"
        }

        this.settings = {
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

        return this.settings;
    }
}