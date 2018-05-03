const express = require('express');
var bodyParser = require('body-parser')

var src = require('../src')

const app = express()
app.use(bodyParser.json());

const path = require('path');
app.use(express.static(path.join(__dirname, '../build')));

app.use(src);
app.listen(3001, () => console.log('Example app listening on port 3001!'))
