var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser')
const MongoClient = require('mongodb').MongoClient;
const nodemailer = require('nodemailer');
const connectionString = process.env.MONGODB_CONNECTION_STRING;
router.use(cookieParser());


router.use("/views",express.static(__dirname + '..' + '/views'));
router.use("/assets",express.static(__dirname + '..' + '/assets'));

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
    }
})

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('Participants');
    const roomCollection = db.collection('Room');
    const testingCollection = db.collection('Testing');
    router.post('/test', (req,res) => {
        const token  = req.cookies.token;
        if(token === process.env.ADMIN_EMAIL) {
            // const someDate = new Date(req.body.meetingtime);
                // schedule.scheduleJob(someDate, () => {
                //     console.log('Meeting Is Started!');
                //     //Add Email
                //     let mailOptions = {
                //         from : process.env.ADMIN_EMAIL,
                //         to : 'fahimmaria155@gmail.com',
                //         subject: "Preparation For Upcoming Contest",
                //         text: "Hello, Best of luck for your upcoming contest."
                //     }
                //     transporter.sendMail(mailOptions, function(err,data ) {
                //         if(err) {
                //             console.log('Er0r');
                //         } else {
                //             console.log('Done');
                //         }
                //     })
                //     schedule.cancelJob(someDate);
                // })
                testingCollection.insertOne(req.body)
                .then(result => {
                res.redirect('/admin');
            }).catch(err => console.log(err));
        }
        else {
            return res.json({ status: "error", error: "Please Login Before Accessing your Profile" })
        }
        
    })

    router.post('/deletecontest', (req,res) =>{
        testingCollection.deleteMany({});
        res.render('Admin'); 
    })

    router.post('/clearRoom', (req,res) => {
        roomCollection.deleteMany({});
        res.render('Admin');
    })

    router.post('/api/login',(req,res) => {
        const {username, password} = req.body;
        console.log(username + ' ' + password);
        // console.log(process.env);
        if(username === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
            return res.json({status: "ok",data: username})   
        } else {
            return res.json({ status: "error", error: "Invalid username/password" })
        }
    })

    router.get('/adminLogin', (req,res) => {
        res.render('Login');
    })

    router.get('/admin', (req,res) => {
        const token  = req.cookies.token;
        if(token === process.env.ADMIN_EMAIL) {
            res.render('Admin');
        } else {
            res.render('error', {error: 'Please Login With your Credentials to access this page'});
        }
    })
})

module.exports = router;