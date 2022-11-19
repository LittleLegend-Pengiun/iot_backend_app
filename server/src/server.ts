import fastify from "fastify";
import appRouter from "./route/app.router";
import * as dotenv from 'dotenv';
import { countSocketConnection } from "./services/socketio/user.counter";
dotenv.config();

const server = fastify();

export const serverInit = () => {
    server.register(require('fastify-socket.io'));
    server.register(appRouter, { prefix: "/" });
    server.ready(() =>{
        countSocketConnection(server);
    })
    return server;
}