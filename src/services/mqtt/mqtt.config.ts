export class Settings {
    clientTopics: any
    settings: any

    constructor(){
        this.clientTopics = {
            led: "bbc-led"
        }

        this.settings = {
            username: "hoanganhle",
            activeKey: "aio_YwYD04uYo2GRLuK56Bh7DV3N8v5L",
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