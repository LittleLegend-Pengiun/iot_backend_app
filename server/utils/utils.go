package utils

type AdafruitAPIData struct {
	Id            string `json:"id"`
	Value         string `json:"value"`
	Feed_id       int    `json:"feed_id"`
	Feed_key      string `json:"feed_key"`
	Created_at    string `json:"created_at"`
	Created_epoch int32  `json:"created_epoch"`
	Expiration    string `json:"expiration"`
}

type AdafruitData struct {
	led  any
	humi any
	temp any
	pump any
}

const Username = "Tez0106"

func DeviceID() AdafruitData {
	return AdafruitData{
		led:  "bbc-led",
		humi: "bbc-humi",
		temp: "bbc-temp",
		pump: "bbc-pump",
	}
}
