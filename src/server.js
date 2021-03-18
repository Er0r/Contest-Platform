let express = require('express');
let app = express();
var bodyParser = require('body-parser');
let server = require('http').Server(app);
let path = require('path');
var cookieParser = require('cookie-parser')

require('dotenv').config();

var validation = require('./controller/validation.controller');
var admin = require('./controller/admin.controller');
var userlogin =  require('./controller/userlogin.controller');
var challenge = require('./controller/challenge.controller');
var lastpage = require('./controller/lastpage.controller');
var room = require('./controller/room.controller');

app.use("/Assets",express.static(__dirname + '/Assets'));
app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json()); 
app.use(cookieParser());

app.set('view engine', 'ejs') 
app.set('views', path.join(__dirname, 'views')) 
app.set('assets', path.join('assets')) 


app.use('/Validation', validation);
app.use('/',admin);
app.use('/userlogin', userlogin);
app.use('/',challenge);
app.use('/',lastpage);
app.use('/',room);


server.listen(process.env.PORT || 5000)