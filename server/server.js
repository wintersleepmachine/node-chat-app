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
const {generateMessage, generateLocationMessage} = require("./utils/message.js")



//

io.on("connection", (socket) => {
    console.log(("New user connected"))
    
    socket.emit("newMessage", generateMessage("Admin", "Welcome to the chatapp"))
    socket.broadcast.emit("newMessage", generateMessage("Admin", "New user has joined"))



    socket.on("createMessage", function(message, callback){
        console.log("createMessage", message)
        io.emit("newMessage", generateMessage(message.from, message.text))
        callback("This is from sever")

    })

    socket.on("createLocationMessage", (coords) => {
        io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude))
    })
    
    
    socket.on("disconnect", () =>{
        console.log("client has disconnected")
    })

})





//


server.listen(port, () => {
    console.log(`Server is up on port: ${port}`)
})
