const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/index');
require('dotenv').config({});

const app = express();

app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true})
    .then(() => console.log('MongoDb connected'))
    .catch(err => console.log(`Mongo error ${err}`))

const port = process.env.PORT || 3002;

app.use('/', routes);

app.listen(port, () => {
    console.log(`Connected at port ${port}`)
})