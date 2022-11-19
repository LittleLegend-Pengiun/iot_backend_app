import { setSocket } from "../mqtt/mqtt.service";

let userNo = 0;
let socket: any;
export const countSocketConnection = (server: any) => {
    socket = server.io;
    socket.on("connection", () => {
        userNo++;
        socket.emit("users", userNo);
    });
    
    socket.off("connection", () => {
        userNo--;
        socket.emit("users", userNo);
    });
    setSocket(socket);
}

export default socket;