const express= require('express');
const app = express();
const path = require('path');
const port=8080; // Default port

app.use(express.static(path.join(__dirname,"public/js"))); // Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname,"public/css")));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    console.log('Received a request for the root path');
    //res.send('Hello, World!');
    res.render("home")
});

app.get("/ig/:username", (req, res) => {
    let {username} = req.params;
    const instaData=require("./data.json");//instaData is an object with usernames as keys and their data as values
    console.log(instaData[username]);
    if (instaData[username]) {

        res.render("instagram.ejs",{data:instaData[username]});
    }
    else{
        res.render("error.ejs");
    }
});
 
app.get("/hello", (req, res) => {
    res.send("Hello, World!");
});

app.get("/rolldice", (req, res) => {
    let diceVal=Math.floor(Math.random() * 6) + 1
    res.render("rolldice",{num: diceVal});
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});