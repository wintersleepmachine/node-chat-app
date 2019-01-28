const expect = require("expect")
const {isRealString} = require("./validation.js")


describe("Testing isRealString function", () =>{
    let nonString = isRealString(undefined);
    let spacesOnly = isRealString("      ");
    let stringWithSpaces = isRealString("   Lord of the strings   ")

    it("Should reject non-string values", () => {
        expect(nonString).toBe(false);
    })

    it("Should not accept empty strings", () => {
        expect(spacesOnly).toBe(false);
    })

    it("Should accept a valid string with spaces in between", () =>{
        expect(stringWithSpaces).toBe(true)
    })
})
