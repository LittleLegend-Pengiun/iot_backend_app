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
	led  AdafruitAPIData
	humi AdafruitAPIData
	temp AdafruitAPIData
	pump AdafruitAPIData
}

func DeviceID() []string {
	return []string{"bbc-led", "bbc-humi", "bbc-temp"}
}
