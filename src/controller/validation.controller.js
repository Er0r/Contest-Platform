var express = require('express');
var router = express.Router();
require('dotenv').config();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:false})); 
router.use(bodyParser.json()); 

const MongoClient = require('mongodb').MongoClient;

const connectionString = process.env.MONGODB_CONNECTION_STRING;

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('Participants');
    const registrationCollection = db.collection('Registration');
    router.post('/',(req, res) => {
        console.log(req.body);
        registrationCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
    })
    router.get('/',(req, res) => {
        db.collection('Testing').find().toArray()
            .then(contest => {
                res.render('validation', {contest: contest});
            }).catch(err => console.log(err));
    })
}).catch(err => console.log(err))

module.exports = router;