package main

import (
	"log"

	"github.com/LittleLegend-Pengiun/iot_backend_app/server/goserver"
)

func main() {
	log.Fatal(goserver.RunServer(6969))
}
