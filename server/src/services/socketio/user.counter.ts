let userNo = 0;

export const countSocketConnection = (server: any) => {
    const socket: any = server.io;
    socket.on("connection", () => {
        userNo++;
        socket.emit("users", userNo);
    });
    
    socket.off("connection", () => {
        userNo--;
        socket.emit("users", userNo);
    });
}
