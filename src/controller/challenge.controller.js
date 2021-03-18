var express = require('express');
var router = express.Router();
let server = require('http').Server(router);
let io = require('socket.io')(server);
var contesthandler = require('../Assets/js/contesthandler');
let stream = require('../ws/stream');
const MongoClient = require('mongodb').MongoClient;
const connectionString = process.env.MONGODB_CONNECTION_STRING;
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('Participants');
    const testingCollection = db.collection('Testing');
    router.get('/', (req, res)=>{
        io.of('/stream').on('connection', stream);
        let i=0;
        res.clearCookie('agenumber');
        testingCollection.find().toArray()
            .then(contest => { 
                if(contest.length >= 0 ) {
                    res.render('challenge', {contests: contest, contesthandler: contesthandler});
                }else {
                    res.render('handler', {contests: contest, contesthandler: contesthandler});
                }    
            })
    });
})

router.get('/result', (req,res) => {
    res.render('winnerpage');
})

router.get('/faq', (req,res) => {
    res.render('faq');
})

router.get('/description', (req,res) => {
    res.render('description');
})

router.get('/error', (req,res) => {
    res.render('error');
})


module.exports = router;