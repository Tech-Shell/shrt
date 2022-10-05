const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const Links = require('./models/Links');
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

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})