import { serverInit } from "./server"

const server = serverInit();

const main = async () => {
    try {
        await server.listen({port: 3000, host: "localhost"})
        console.log("server is ready at port 3000")
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

main()