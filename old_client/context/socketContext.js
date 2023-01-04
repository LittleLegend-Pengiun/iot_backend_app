import io from 'socket.io-client';
import { createContext } from 'react';

const API = `http://localhost:3030`;

export let socket = io(API, { transports: ['websocket'] });
export const SocketContext = createContext();