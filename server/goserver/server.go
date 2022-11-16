package goserver

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func RunServer(port int) error {
	var err error
	app := fiber.New()
	err = app.Listen(":" + strconv.Itoa(port))
	if err != nil {
		return err
	}

	return nil
}
