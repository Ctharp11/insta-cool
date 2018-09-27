const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/index');
var cors = require('cors')
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true})
    .then(() => console.log('MongoDb connected'))
    .catch(err => console.log(`Mongo error ${err}`))

const port = process.env.PORT || 7777;

app.use('/', routes);

if (process.env.NODE_ENV === 'development') {
    app.use(cors({credentials: true, origin: 'http://localhost:3000'})); 
 }
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }

app.listen(port, () => {
    console.log(`Connected at port ${port}`)
})