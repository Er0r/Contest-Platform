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
var contesthandler = require('./assets/js/contesthandler');
const MongoClient = require('mongodb').MongoClient;
const nodemailer = require('nodemailer');
var roomhandler = require('./assets/js/roomhandler');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
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
const connectionString = process.env.MONGODB_CONNECTION_STRING;

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
        var link = req.url;
        var flag=0;
        db.collection('Room').find().toArray()
        .then(room => {
            for(var i=0;i<room.length;i++){
                if(room[i].roomlink === link){
                    cap = room[i].capacity;
                    res.render('abc', {capacity: cap});
                    flag=1;
                    break;
                }
            }
            if(flag==0){
                db.collection('Room').insertOne({"roomlink":req.url, "capacity": 1, "age": req.cookies.agenumber });  
            }
        })        
    })

    // Data insertion
    app.post('/Validation',(req, res) => {
        console.log(req.body);
        registrationCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
        
        // Validation Needed 
        // registrationCollection.find().toArray()
        // .then(result => {
        //     for(var i=0;i<result.length;i++){
        //         if(req.body.email === result[i].email){
        //             console.log('Break E Gese');
        //             res.render('error',{error: 'Your Email Already Exists!!'});
        //             break;
        //         }
        //         else if((req.body.email != result[i].email) && (i === result.length-1)){
        //             console.log('Okey');
                    
        //         }
        //     }      
        // }).catch(err => console.log(err))
        
    })

    app.get('/Validation',(req, res) => {
        db.collection('Testing').find().toArray()
            .then(contest => {
                res.render('validation', {contest: contest});
            }).catch(err => console.log(err));
    })




    // Validation
    app.post('/userlogin',(req,res3)=> {
        let db = client.db('Participants');
        var email = req.body.email; 
        var password = req.body.pwd; 
      
        var it =0;   
        db.collection('Testing').find().toArray()
            .then(contest => {

                for(var con = 0; con < contest.length; con++){
                    if(contesthandler.contestentry(contest[con].meetingtime) === true){
                        var contestname = contest[con].contestname;
                        db.collection('Registration').find().toArray()
                        .then(item => {
                            for(var i=0;i< item.length;i++){
                                var em = item[i].email;
                                var pass = item[i].pwd;
                                var age = item[i].age;
                             
                                var contest = item[i].contest;
                                var flag=0;
                                if((password === pass) && (email === em) && (contestname === contest)) {
                                    console.log(age);
                                    db.collection('Room').find().sort( { age: 1 } ).toArray()
                                        .then(room => {
                                            if(room.length > 0){
                                                for(var j=0;j<room.length;j++){
                                                    if(room[j].capacity < 4 && (room[j].age >= 18 && room[j].age <= 20) && (age >= 18 && age <= 20)){
                                                        var link = room[j].roomlink;
                                                        var cap = room[j].capacity;
                                                        var id = room[j]._id;
                                                        flag=1;
                                                        roomCollection.updateOne(
                                                            { roomlink: room[j].roomlink },
                                                            {
                                                                $inc: {capacity: 1},$set: {age: age}
                                                            },
                                                        )
                                                        res3.render('Partners',{ roomlink: link, cap: cap, roomid:id });
                                                        break;
                                                    } else if((room[j].capacity < 4) && (room[j].age >= 21 && room[j].age <= 23) && (age >= 21 && age <= 23)){
                                                        var link = room[j].roomlink;
                                                        var cap = room[j].capacity;
                                                        var id = room[j]._id;
                                                        flag=1;
                                                        roomCollection.updateOne(
                                                            { roomlink: room[j].roomlink },
                                                            {
                                                                $inc: {capacity: 1},$set: {age: age}
                                                            },
                                                        )    
                                                        res3.render('Partners',{ roomlink: link, cap: cap, roomid:id });
                                                        break;  
                                                    } else if(room[j].capacity < 4 && (room[j].age >= 24 && room[j].age <= 27) && (age >= 24 && age <= 27)){
                                                       
                                                            var link = room[j].roomlink;
                                                            var cap = room[j].capacity;
                                                            var id = room[j]._id;
                                                            flag=1;
                                                            roomCollection.updateOne(
                                                                { roomlink: room[j].roomlink },
                                                                {
                                                                    $inc: {capacity: 1},$set: {age: age}
                                                                },
                                                            )
                                                            
                                                            res3.render('Partners',{ roomlink: link, cap: cap, roomid:id });
                                                            break;  
                                                        
                                                    } else if(room[j].capacity < 4 && (room[j].age >= 28 && room[j].age <= 31) && (age >= 28 && age <= 31)){        
                                                        var link = room[j].roomlink;
                                                        var cap = room[j].capacity;
                                                        var id = room[j]._id;
                                                        flag=1;
                                                        roomCollection.updateOne(
                                                            { roomlink: room[j].roomlink },
                                                            {
                                                                $inc: {capacity: 1},$set: {age: age}
                                                            },
                                                        )
                                                        
                                                        res3.render('Partners',{ roomlink: link, cap: cap, roomid:id });
                                                        break;  
                                                        
                                                    } else if(room[j].capacity < 4 && (room[j].age >= 31 && room[j].age <= 33) && (age >= 31 && age <= 33)){
                                                        
                                                            var link = room[j].roomlink;
                                                            var cap = room[j].capacity;
                                                            var id = room[j]._id;
                                                            flag=1;
                                                            roomCollection.updateOne(
                                                                { roomlink: room[j].roomlink },
                                                                {
                                                                    $inc: {capacity: 1},$set: {age: age}
                                                                },
                                                            )
                                                            
                                                            res3.render('Partners',{ roomlink: link, cap: cap, roomid:id });
                                                            break;  
                                                        
                                                    } else if(room[j].capacity < 4 && (room[j].age >= 34 && room[j].age <= 36) && (age >= 34 && age <= 36)){
                        
                                                            var link = room[j].roomlink;
                                                            var cap = room[j].capacity;
                                                            var id = room[j]._id;
                                                            flag=1;
                                                            roomCollection.updateOne(
                                                                { roomlink: room[j].roomlink },
                                                                {
                                                                    $inc: {capacity: 1},$set: {age: age}
                                                                },
                                                            )
                                                            
                                                            res3.render('Partners',{ roomlink: link, cap: cap, roomid:id });
                                                            break;  
                                                        }
                                                    
                                                }
                                                if(flag==0){
                                                    res3.cookie('agenumber', age);
                                                    res3.render('index');
                                                }
                                            }
                                            else {
                                                res3.cookie('agenumber', age);
                                                res3.render('index');
                                            }
                                        }).catch(err => console.log(err)) 
                                        break;
                                } else if(i === item.length-1){
                                    res3.render('error',{error: 'Your Email Or Password Is Invalid!!'});
                                    break;
                                }
                            }
                        }).catch(err => console.log(err));
                        it=1;
                    } 
                }
                if(it !== 1){
                    res3.render('error', {error: 'Contest Is Not Started . Thanks For Your Patience '});
                }
                       
        })  
    })

    

    //Testing 
    app.post('/test', (req,res) => {
        const token  = req.cookies.token;
        if(token === process.env.ADMIN_EMAIL) {
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
                res.render('admin', {name: req.body.contestname, time: req.body.meetingtime});
            }).catch(err => console.log(err));
        }
        else {
            return res.json({ status: "error", error: "Please Login Before Accessing your Profile" })
        }
        
    })

    app.post('/deletecontest', (req,res) =>{
        db.collection('Testing').deleteMany({});
        res.render('Admin'); 
    })

    app.post('/clearRoombtn', (req,res) => {
        db.collection('Room').deleteMany({});
        res.render('Admin');
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
            res.render('error', {error: 'Please Login With your Credentials to access this page'});
        }
    })

    //Testing End
    
    app.get('/', (req, res)=>{
        let db = client.db('Participants');
        io.of('/stream').on('connection', stream);
        let i=0;
        res.clearCookie('agenumber');
        db.collection('Testing').find().toArray()
            .then(contest => { 
                if(contest.length >= 0 ) {
                    res.render('challenge', {contests: contest, contesthandler: contesthandler});
                }else {
                    res.render('handler', {contests: contest, contesthandler: contesthandler});
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

app.get('/result', (req,res) => {
    res.render('winnerpage');
})

app.get('/faq', (req,res) => {
    res.render('faq');
})

app.get('/description', (req,res) => {
    res.render('description');
})

server.listen(3000, console.log('Server Is Running'));