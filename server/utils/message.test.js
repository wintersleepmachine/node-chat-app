const expect = require("expect")
var {generateMessage, generateLocationMessage} = require("./message")
describe("generateMessage", () =>{
    it("Should generate the correct message object", () => {
        let message = generateMessage("Andrew", "Hello!")
        expect(message.from)
        .toBe("Andrew")
       

        expect(message.text)
        .toBe("Hello!")
       

        expect(message.createdAt)
        .toBeA("number")
        
    })
})

describe("generateLocationMessage", () => {
    it("should generate correct location object", () => {
        let from = "Jesse"
        let latitude = 1
        let longitude = 2

        let locationObj = generateLocationMessage(from, latitude, longitude)

        expect(locationObj.from).toBe("Jesse");
        expect(locationObj.createdAt).toBeA("number");
        expect(locationObj.url).toBe("https://www.google.com/maps?q=1, 2");


    })
})