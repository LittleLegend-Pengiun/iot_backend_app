package goserver

import (
	"github.com/gofiber/fiber/v2"
)

func RunServer() error {
	app := fiber.New()
	err := app.Listen(":6969")
	if err != nil {
		return err
	}
	return nil
}
