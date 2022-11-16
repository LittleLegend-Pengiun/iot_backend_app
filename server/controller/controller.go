package controller

import (
	"encoding/json"
	"net/http"

	"github.com/LittleLegend-Pengiun/iot_backend_app/server/utils"
	"github.com/gofiber/fiber/v2"
	"github.com/vicanso/go-axios"
)

func GetAllData(c *fiber.Ctx) error {
	res, err := axios.Get("https://io.adafruit.com//api/v2/" + utils.Username + "/feeds/bbc-led/data")
	if err != nil {
		return c.Status(http.StatusBadRequest).SendString(err.Error())
	}

	var adafruitData []utils.AdafruitAPIData
	json.Unmarshal(res.Data, &adafruitData)

	return c.Status(http.StatusOK).JSON(adafruitData)
}

func GetAllChartData(c *fiber.Ctx) error {
	return nil
}

func UpdateDeviceStatus(c *fiber.Ctx) error {
	return nil
}
