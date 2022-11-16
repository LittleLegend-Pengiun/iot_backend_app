package userRoute

import (
	"github.com/LittleLegend-Pengiun/iot_backend_app/server/users/controller"
	"github.com/gofiber/fiber/v2"
)

func Router(app *fiber.App) {
	user := app.Group("/users", controller.GetAllUser)
	user.Post("/authenticate", controller.GetAllUser)
}
