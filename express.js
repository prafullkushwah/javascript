const express = require("express");
const app = express();

const port = 8080;

app.use(express.static(Path.join(__dirname,"/public/js"))) ;
app.use(express.static(Path.join(__dirname,"/public/css"))) ;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/ig/:username", (req, res) => {
    const { username } = req.params;

    const instaData = require("./views/data.json");
    const data = instaData[username];

    if (data) {
        res.render("instagram.ejs", { data });
    }else{
        res.render("error.ejs") ;
    }


});


app.get("/hello", (req, res) => {
    res.send("hello");
});


app.get("/rolldice", (req, res) => {
    const dice = Math.floor(Math.random() * 6) + 1;
    res.render("rolldice", { dice });
});

app.listen(port, () => {
    console.log(`server is running on ${port}`);
});
