const expect = require("expect")
const {Users} = require("./users.js")



describe("Users", () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id:"1",
            name: "mike",
            room: "node course"
        },{
            id:"2",
            name: "jen",
            room: "react course"
        },{
            id:"3",
            name: "julie",
            room: "node course"
        }]
    })

    it("should add a new user", () =>{
        let users = new Users()
        let user = {
            id: "123",
            name: "Jesse",
            room: "RoomA"
        }

        let resUser = users.addUser(user.id, user.name, user.room)

        expect(users.users).toEqual([user])

    })

    it("should return names for node course", () => {
        let userList = users.getUserList("node course");

        expect(userList).toEqual(["mike", "julie"])
    })

    it("should return names for react course", () => {
        let userList = users.getUserList("react course");

        expect(userList).toEqual(["jen"])
    })

    it("(removeUser)should remove a user", () => {
        
    expect(users.removeUser("1")).toEqual([{
            id:"2",
            name: "jen",
            room: "react course"
        },{
            id:"3",
            name: "julie",
            room: "node course"
        }])


    })

    it("(removeUser)should not remove user", () => {
        expect(users.removeUser("5555")).toEqual([{
            id:"1",
            name: "mike",
            room: "node course"
        },{
            id:"2",
            name: "jen",
            room: "react course"
        },{
            id:"3",
            name: "julie",
            room: "node course"
        }])
    })

    it("(getUser)should find user", () => {
        let user = users.getUser("1")
        expect(user).toEqual({
            id:"1",
            name: "mike",
            room: "node course"
        })
    })

    it("(getUser) Shouldnot find user", () => {
        let user = users.getUser("555")
        expect(user).toEqual(null)
    })

})