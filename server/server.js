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


//

io.on("connection", (socket) => {
    console.log(("New user connected"))

    socket.on("createMessage", function(message){
        console.log("New message from chrome console",message)
        io.emit("newMessage", {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    })
    
    
    socket.on("disconnect", () =>{
        console.log("client has disconnected")
    })

})




//


server.listen(port, () => {
    console.log(`Server is up on port: ${port}`)
})
