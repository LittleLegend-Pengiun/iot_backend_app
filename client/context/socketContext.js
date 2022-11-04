import io from 'socket.io-client';
import { createContext } from 'react';

const API = `${process.env.API_HOST}:${process.env.WS_PORT}`;

export let socket = io(API, {transports: ['websocket']});
export const SocketContext = createContext();