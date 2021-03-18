var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const connectionString = process.env.MONGODB_CONNECTION_STRING;

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('Participants');
    const roomCollection = db.collection('Room');
    router.get('/room:id',(req,res) => {
        var link = req.url;
        var flag=0;
        roomCollection.find().toArray()
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
                roomCollection.insertOne({"roomlink":req.url, "capacity": 1, "age": req.cookies.agenumber });  
            }
        })        
    })

})


module.exports = router;