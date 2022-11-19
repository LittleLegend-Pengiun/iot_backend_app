import fastify from "fastify";
import appRouter from "./route/app.router";
import { countSocketConnection } from "./services/socketio/user.counter";
import socketioServer from 'fastify-socket.io'

const server = fastify();
export const serverInit = () => {
    server.register(socketioServer);
    server.register(appRouter, { prefix: "/" });
    server.ready(() =>{
        countSocketConnection(server);
    })
    return server;
}