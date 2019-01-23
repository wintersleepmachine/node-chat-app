const path = require("path")
const http = require("http")
const express = require("express")
const publicPath = path.join(__dirname, "../public")
const port = process.env.PORT || 3000;
const socketIO = require("socket.io")

const app = express()
let server = http.createServer(app)
let io = socketIO(server)

app.use(express.static(publicPath))


io.on("connection", (socket) => {
    console.log(("New user connected"))

    socket.on("disconnect", () =>{
        console.log("client has disconnected")
    })
})




server.listen(port, () => {
    console.log(`Server is up on port: ${port}`)
})
