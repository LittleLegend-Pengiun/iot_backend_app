package goserver

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func RunServer(port int) error {
	var err error
	app := fiber.New()
	//router.Routes(app)
	fmt.Println("Server running at port 6969")
	err = app.Listen(":6969")
	if err != nil {
		return err
	}
	return nil
}
