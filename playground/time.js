const moment = require("moment")

let someTimeStamp = moment().valueOf()
let time = moment(someTimeStamp).format("H:mm")

console.log(time)