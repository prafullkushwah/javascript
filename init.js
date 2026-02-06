const mongoose = require("mongoose");
const chat = require("./models/chat.js");

main().then(()=>console.log("connection successfull"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
let chats=[
    {
        from:"neha",
        to:"blyender",
        msg:"hello blyender❤️",
        created_at:new Date(),
    },
    {
        from:"rohan",
        to:"shreya",
        msg:"hello shreya❤️",
        created_at:new Date(),
    },
    {
        from:"naman",
        to:"shifa",
        msg:" hello shifa❤️",
        created_at:new Date(),
    },
]

chat.insertMany(chats);



