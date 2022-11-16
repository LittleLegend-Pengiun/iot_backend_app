package route

import (
	"github.com/LittleLegend-Pengiun/iot_backend_app/server/controller"
	"github.com/LittleLegend-Pengiun/iot_backend_app/server/users/userRoute"
	"github.com/gofiber/fiber/v2"
)

func Router(app *fiber.App) {
	app.Get("/get-all-data", controller.GetAllData)
	app.Get("/get-all-chart-data", controller.GetAllChartData)
	app.Post("/update-device-status", controller.UpdateDeviceStatus)
	userRoute.Router(app)
}
