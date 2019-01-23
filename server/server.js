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

    socket.on("newMessage", function(message){
        console.log(message)
    })
    
    socket.emit("newMessage", {
        from: "Andrew",
        text: "Hey can you meet up at 6?",
        createdAt: 1234
    })

    socket.on("disconnect", () =>{
        console.log("client has disconnected")
    })

    
})



io.on("newMessage", function(message){
    console.log("From the console of chrome", message)
})




//


server.listen(port, () => {
    console.log(`Server is up on port: ${port}`)
})
