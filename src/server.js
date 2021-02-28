let express = require('express');
let app = express();
var bodyParser = require('body-parser');
let server = require('http').Server(app);
let io = require('socket.io')(server);
let stream = require('./ws/stream');
let path = require('path');
const schedule = require('node-schedule');
var cookieParser = require('cookie-parser')
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fahimmaria155@gmail.com',
        pass:'Isamariabuet123*'
    }
})

const port = process.env.PORT || 3000;

app.use("/Assets",express.static(__dirname + '/Assets'));
app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json()); 
app.use(cookieParser());

app.set('view engine', 'ejs') 
app.set('views', path.join(__dirname, 'views')) 
app.set('assets', path.join('assets')) 
const connectionString = "mongodb+srv://fahim:fahim@cluster0.qwhrs.mongodb.net/Participants?retryWrites=true&w=majority";

app.get('/error', (req,res) => {
    res.render('error');
})

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
  
    const db = client.db('Participants');
    const registrationCollection = db.collection('Registration');
    const testingCollection = db.collection('Testing');
    const roomCollection = db.collection('Room');
    app.get('/room:id',(req,res) => {
        // res.render('abc');
        
        
        console.log(req.url);
        // Many Room Exception !important // jokhon ekadhik room thakbe, tokhon insert hobe na //
        var link = req.url;
        var flag=0;
        db.collection('Room').find().toArray()
        .then(room => {
            for(var i=0;i<room.length;i++){
                if(room[i].roomlink === link){
                    flag=1;
                    break;
                }
            }
            if(flag==0){
                db.collection('Room').insertOne({"roomlink":req.url, "capacity": 1 });  
            }
        })

        db.collection('Room').find().toArray()
        .then(room => {
            for(var i=0;i<room.length;i++){
                if(room[i].roomlink === link) {
                    cap = room[i].capacity;
                    res.render('abc', {capacity: cap});
                    break;
                }
            } 
        })
        //  db.collection('Room').insertOne({"roomlink":req.url, "capacity": 1});  
    })

    // Data insertion
    app.post('/Validation',(req, res) => {
        registrationCollection.find().toArray()
            .then(result => {
                for(var i=0;i<result.length;i++){
                    if(req.body.email === result[i].email){
                        res.redirect('/');
                        break;
                    }
                    else if((req.body.email != result[i].email) && (i === result.length-1)){
                        let mailOptions = {
                            from : process.env.ADMIN_EMAIL,
                            to : `${req.body.email}`,
                            subject: "Thanks For Registered",
                            text: "Hello, Thanks For Registering. Best of luck for your upcoming contest."
                        }
                        transporter.sendMail(mailOptions, function(err,data ) {
                            if(err) {
                                console.log('Er0r');
                            } else {
                                console.log('Done');
                            }
                        })
                        registrationCollection.insertOne(req.body)
                            .then(result => {
                                res.redirect('/');
                            })
                            .catch(err => console.log(err));
                    }
                }
                
        })
        
    })

    app.get('/Validation',(req, res) => {
        
        res.render('validation');
        
    })


    // Validation
    app.post('/Registration',(req,res3)=> {
        
        let db = client.db('Participants');
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        let today = year + "-" + month + "-" + date + "T" + hours + ":" + minutes;
        var email = req.body.email; 
        var password = req.body.pwd;     

        db.collection('Testing').find().toArray()
            .then(contest => {
                const splitdatetime = contest[0].meetingtime;
                console.log(splitdatetime);
                const dates = splitdatetime.split('-');
                const contestyear = dates[0];
                const contestmonth = dates[1];
                const contestday = dates[2].split('T');
                const times = contestday[1].split(':');
                const contesthour = times[0];
                const contestminute = times[1];
                let diffhour = contesthour - hours;
                let diff = Math.floor(parseInt(contesthour)-parseInt(hours));

                if((parseInt(contestyear) === parseInt(year)) && (parseInt(contestmonth) === parseInt(month)) && (parseInt(contestday[0]) === parseInt(date)) && ((diff <= 1) && (diff >= -1) )){
                    // console.log('Okey');
                    db.collection('Registration').find().toArray()
                    .then(item => {
                        for(var i=0;i< item.length;i++){
                            var em = item[i].email;
                            var pass = item[i].pwd;
                            var flag=0;
                            if((password === pass) && (email === em)) {
                                db.collection('Room').find().toArray()
                                    .then(room => {
                                        if(room.length > 0){
                                            for(var j=0;j<room.length;j++){
                                                if(room[j].capacity < 4){
                                                    var link = room[j].roomlink;
                                                    var cap = room[j].capacity;
                                                    var id = room[j]._id;
                                                    flag=1;
                                                    roomCollection.updateOne(
                                                        { roomlink: room[j].roomlink },
                                                        {
                                                            $inc: {capacity: 1}
                                                        }
                                                    )
                                                    res3.render('Partners',{ roomlink: link, cap: cap, roomid:id });
                                                    break;
                                                } 
                                            }
                                            if(flag==0){
                                                res3.render('index');
                                            }
                                        }
                                        else {
                                            res3.render('index');
                                        }
                                    }).catch(err => console.log(err)) 
                                    break;
                            } else if(i === item.length-1){
                                res3.status(401);
                                res3.render('error',{error: 'Your Email Or Password Is Invalid!!'});
                            }
                        }
                    }).catch(err => console.log(err));
                } else if(parseInt(diff) > 3){
                    res3.status(404);
                    res3.render('error', {error: 'Contest is Already Finished'});
                } 
                else {
                    res3.status(404);
                    res3.render('error', {error: 'Contest Is Not Started O. Thanks For Your Patience '});
                }
                
        })  
    })

    

    //Testing 
    app.post('/test', (req,res) => {

        const someDate = new Date(req.body.meetingtime);
        schedule.scheduleJob(someDate, () => {
            console.log('Meeting Is Started!');
            //Add Email
            let mailOptions = {
                from : process.env.ADMIN_EMAIL,
                to : 'fahimmaria155@gmail.com',
                subject: "Preparation For Upcoming Contest",
                text: "Hello, Best of luck for your upcoming contest."
            }
            transporter.sendMail(mailOptions, function(err,data ) {
                if(err) {
                    console.log('Er0r');
                } else {
                    console.log('Done');
                }
            })
            schedule.cancelJob(someDate);
        })
        testingCollection.insertOne(req.body)
        .then(result => {
        res.render('challenge', {name: req.body.contestname, time: req.body.meetingtime});
    })
        .catch(err => console.log(err));
    })

    app.post('/deletecontest', (req,res) =>{
        db.collection('Testing').deleteMany({});
        res.render('handler');
    })

    app.post('/api/login',(req,res) => {
        const {username, password} = req.body;
        console.log(username + ' ' + password);
        // console.log(process.env);
        if(username === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
            return res.json({status: "ok",data: username})   
        } else {
            return res.json({ status: "error", error: "Invalid username/password" })
        }
    })

    app.get('/adminLogin', (req,res) => {
        res.render('Login');
    })

    app.get('/admin', (req,res) => {
        const token  = req.cookies.token;
        if(token === process.env.ADMIN_EMAIL) {
            res.render('Admin');
        } else {
            return res.json({ status: "error", error: "Please Login Before Accessing your Profile" })
        }
    })

    //Testing End
    
    app.get('/', (req, res)=>{
        let db = client.db('Participants');
        io.of('/stream').on('connection', stream);
        db.collection('Testing').find().toArray()
            .then(contest => {
                if(contest.length > 0) {
                    res.render('challenge', {name: contest[0].contestname, time: contest[0].meetingtime});
                }    else {
                    res.render('handler');
                }
                
            })
    });
    app.get('/lastpage', (req,res) => {
        let db = client.db('Participants');
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        let today = year + "-" + month + "-" + date + "T" + hours + ":" + minutes;
        db.collection('Testing').find().toArray()
            .then(contest => {
                const splitdatetime = contest[0].meetingtime.split('T');
                const dates = splitdatetime[0].split('-');
                const contestyear = dates[0];
                const contestmonth = dates[1];
                const contestday = dates[2];      
                const times = splitdatetime[1].split(':');
                const contesthour = times[0];
                const contestminute = times[1];
                res.render('LastPage');
              
            })
        
    });
})

app.get('/faq', (req,res) => {
    res.render('faq');
})


server.listen(3000, console.log('Server Is Running'));