import io from 'socket.io-client';
import { createContext } from 'react';

const API = `http://localhost:8081`;

export let socket = io(API, {transports: ['websocket']});
export const SocketContext = createContext();