import fastify from "fastify";
import appRouter from "./route/app.router";
import * as dotenv from 'dotenv';
import { countSocketConnection } from "./services/socketio/user.counter";
import socketioServer from 'fastify-socket.io'
dotenv.config();

const server = fastify();

export const serverInit = () => {
    server.register(socketioServer);
    server.register(appRouter, { prefix: "/" });
    server.ready(() =>{
        countSocketConnection(server);
    })
    return server;
}