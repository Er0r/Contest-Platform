var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser')
const MongoClient = require('mongodb').MongoClient;
const connectionString = process.env.MONGODB_CONNECTION_STRING;
router.use(cookieParser());

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('Participants');
    const testingCollection = db.collection('Testing');
       
    router.get('/lastpage', (req,res) => {
        const token  = req.cookies.token;
        console.log(`token ${token}`);
        if(token === process.env.ADMIN_EMAIL) {
            testingCollection.find().toArray()
                .then(contest => {
                    res.render('LastPage');
                })
        }
        else{
            res.render('error', {error: 'Please Login With your Credentials to access this page'});
        }
    });
})

module.exports = router;