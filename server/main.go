package main

import (
	"log"

	"github.com/LitteLegend-Pengiun/iot_backend_app/goserver"
)

func main() {

	if err := goserver.RunServer(8080); err != nil {
		log.Fatal(err)
	}
}
