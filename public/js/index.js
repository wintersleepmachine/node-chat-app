
let socket = io();

socket.on("connect", function(){
    console.log("Connected to server")

    socket.emit("newMessage", {
        from: "Jim",
        text: "Hey Andrew, yeah 6 works!"
    })


})

socket.on("newMessage", function(message){
    console.log("Recieved new Message", message)
})


socket.on("disconnect", function(){
    console.log("Disconnected from server")
})







