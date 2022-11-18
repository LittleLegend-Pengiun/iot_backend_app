require('dotenv').config()
const clientTopics = {
    led: "bbc-led",
    pump: "bbc-pump",
    temp: "bbc-temp",
    humi: "bbc-humi"
};
const settings = {
    username: process.env.ADAFRUIT_USERNAME,
    activeKey: process.env.ADAFRUIT_KEY,
    clientTopics: [
        clientTopics.led,
        clientTopics.pump,
        clientTopics.temp,
        clientTopics.humi
    ],
    feedKey: [
        "bbc-led",
        "bbc-pump",
        "bbc-temp",
        "bbc-humi"
    ],
    feedKeyDetail: clientTopics
}

export const config = {
    clientTopics: clientTopics,
    settings: settings
}