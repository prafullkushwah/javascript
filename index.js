const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const chat = require("./models/chat.js");
const method = require("method-override");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(method("_method"));

main().then(()=>console.log("connection successfull"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


//index route
app.get("/chats", async (req, res) => {
  let chats = await chat.find();
  res.render("index", { chats });
});

//new route
app.get("/chats/new",(req,res)=>{
    res.render("new");
})

//create route
app.post("/chats",(req,res)=>{
  let{from,to,msg} = req.body;
  let newChat = new chat({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date(),
  });
  newChat
  .save()
  .then((res)=>{ console.log("chat saved");})
  .catch((err)=>{ console.log(err);})
  res.redirect("/chats");
})

//edit route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;

  let Chat = await chat.findById(id);

  res.render("edit", { chat: Chat });
});

//update route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg:newMsg } = req.body;
  let updatedChat = await chat.findByIdAndUpdate(id,{msg:newMsg},
    {runValidators:true,new:true});
console.log(updatedChat);
  res.redirect("/chats");
});

//destroy route
app.delete("/chats/:id",async (req, res) => {
let {id} = req.params;
  let deletedchat = await chat.findByIdAndDelete(id);
console.log(deletedchat);
  res.redirect("/chats");
});

app.get("/",(req,res)=>{
    res.send("route is working");
})

app.listen(8080,()=>{
    console.log("server is listening on port 8080");
});