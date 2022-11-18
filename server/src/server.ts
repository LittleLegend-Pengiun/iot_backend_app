import fastify from "fastify";
import appRouter from "./route/app.router";


export const serverInit = () => {
    const server = fastify();
    
    server.register(appRouter, { prefix: "/" })
    return server;
}