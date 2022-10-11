const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const Links = require('./models/Links');
const shortid = require('shortid');
const port = process.env.PORT || 3000;
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true,})
.then(() => {
    console.log('Connected to DB');
})
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.render('index');
})

let mainId = "";
let mainUrl = "";

app.get("/link", async (req,res)=>{
    res.render('link.ejs', {shorturls : mainId, url: mainUrl})
    mainId = "";
    mainUrl = "";
})

app.post("/shortUrls", async(req,res)=>{
    let id = shortid.generate()
    mainId = id
    mainUrl = req.body.fullurl
    await Links.create({
        full : mainUrl,
        short: id,
    });
    res.redirect("/link")
})

app.get('/:shortUrl', async(req,res)=>{
    const shortUrl = await Links.findOne({short: req.params.shortUrl})
    if(shortUrl == null) return res.sendStatus(404)

    shortUrl.save();

    res.redirect(shortUrl.full)
})



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})