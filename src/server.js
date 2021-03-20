let express = require('express');
let app = express();
var bodyParser = require('body-parser');
let server = require('http').Server(app);
let path = require('path');
let io = require( 'socket.io' )( server );
let stream = require( './ws/stream' );
var cookieParser = require('cookie-parser')

require('dotenv').config();

var validation = require('./controller/validation.controller');
var admin = require('./controller/admin.controller');
var userlogin =  require('./controller/userlogin.controller');
var challenge = require('./controller/challenge.controller');
var lastpage = require('./controller/lastpage.controller');
var room = require('./controller/room.controller');


app.use("/ws",express.static(__dirname + '/ws'));
app.use("/assets",express.static(__dirname + '/assets'));
app.use("/controller",express.static(__dirname + '/controller'));
app.use("/views",express.static(__dirname + '/views'));
app.use("/vendor",express.static(__dirname + '/vendor'));
app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json()); 
app.use(cookieParser());

app.set('view engine', 'ejs') 
app.set('views', path.join(__dirname, 'views')) 

io.of( '/stream' ).on( 'connection', stream );
app.use('/',challenge);
app.use('/Validation', validation);
app.use('/',admin);
app.use('/userlogin', userlogin);
app.use('/',lastpage);
app.use('/',room);


server.listen(process.env.PORT || 5000)