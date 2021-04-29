const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000

const app = express();

const routes = require('./prove02-routes');

app.use(express.static(path.join(__dirname, 'public')))
   .set('views', path.join(__dirname))
   .set('view engine', 'ejs')
   .use(bodyParser({extended: false}))
   .use('/', routes) 
   .listen(PORT, () => console.log(`Listening on ${ PORT }`));