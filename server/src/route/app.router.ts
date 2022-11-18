import { FastifyInstance } from "fastify";
import { controller } from "../controller/app.controller"; 

const appRouter = async (server: FastifyInstance) => {
    server.get("check", async () => {
        return { status: "OK" }
    })

    server.get("get-all-data", controller.getAllData);
    server.get("get-all-chart-data/:hours", controller.getAllChartData);
}

export default appRouter;