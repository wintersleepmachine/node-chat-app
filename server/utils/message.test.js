let expect = require("expect")
var {generateMessage} = require("./message")
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