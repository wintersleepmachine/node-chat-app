let socket = io();

function scrollToBottom(){ //Function to scroll user to bottom if new message appears
    //Selectors
    let messages = jQuery("#messages")
    let newMessage = messages.children("li:last-child")
    //Heights
    let clientHeight = messages.prop("clientHeight")
    let scrollTop = messages.prop("scrollTop")
    let scrollHeight = messages.prop("scrollHeight")
    let newMessageHeight = newMessage.innerHeight()
    let lastMessageHeight = newMessage.prev().innerHeight()

    if(scrollTop + clientHeight + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight)
    }

}

socket.on("connect", function(){
    let params = jQuery.deparam(window.location.search)
    
    socket.emit("join", params, function(err){
        if(err){
            alert(err)
            window.location.href = "/"
        }else{
            console.log("No error")
        }
    })
})

socket.on("disconnect", function(){
    console.log("Disconnected from server")
})


socket.on("updateUserList", function(users){
    let ol = jQuery("<ol></ol>")

    users.forEach(function(user){
        ol.append(jQuery("<li></li>").text(user))
    })

    jQuery("#users").html(ol)
})


socket.on("newMessage", function(message){
    
    let formattedTime = moment(message.createdAt).format("h:mm a")
    let template = jQuery("#message-template").html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    })

    jQuery("#messages").append(html)

    scrollToBottom();
    

    
    // console.log("newMessage", message)

    // let li = jQuery("<li></li>")
    // li.text(`${message.from} - ${formattedTime}: ${message.text}`)

    // jQuery("#messages").append(li)
})



socket.on("newLocationMessage", function(message){
    let formattedTime = moment(message.createdAt).format("h:mm a")
    let template = jQuery("#location-message-template").html()

    let html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    })

    jQuery("#messages").append(html)
    scrollToBottom()



    // let li = jQuery("<li></li>")
    // let a = jQuery('<a target="_blank">My current location</a>')

    // li.text(`${message.from}: ${formattedTime} `)
    // a.attr('href', message.url)

    // li.append(a)
    // jQuery("#messages").append(li)
})



jQuery("#message-form").on("submit", function(e){
    e.preventDefault()

    const messageTextbox = jQuery("[name=message]")

    socket.emit("createMessage", {
        text: messageTextbox.val()
    }, function(){
        messageTextbox.val("")
    })
})



let locationButton = jQuery("#send-location")
locationButton.on("click", function(){
    if(!navigator.geolocation){
        return alert("Geolocation not supported by your browser.")
    }

    locationButton.attr("disabled", "disabled").text("Sending location...")

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr("disabled").text("Send location")

        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })

        console.log(position)

    }, function(){
        locationButton.removeAttr("disabled").text("Send location")
        alert("Unable to fetch location")
    })
})










