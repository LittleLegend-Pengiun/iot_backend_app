package goserver

import (
	"strconv"

	"github.com/LittleLegend-Pengiun/iot_backend_app/server/route"
	"github.com/gofiber/fiber/v2"
)

func RunServer(port int) error {
	var err error
	app := fiber.New()
	route.Router(app)
	err = app.Listen(":" + strconv.Itoa(port))
	if err != nil {
		return err
	}

	return nil
}
