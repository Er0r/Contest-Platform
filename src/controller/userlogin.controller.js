var express = require('express');
var router = express.Router();
var contesthandler = require('../assets/js/contesthandler');
const MongoClient = require('mongodb').MongoClient;
const connectionString = process.env.MONGODB_CONNECTION_STRING;


MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('Participants');
    const testingCollection = db.collection('Testing');
    const roomCollection = db.collection('Room');
    const registrationCollection = db.collection('Registration');
    router.post('/',(req,res3)=> {
        let db = client.db('Participants');
        var email = req.body.email; 
        var password = req.body.pwd; 
      
        var it =0;   
        testingCollection.find().toArray()
            .then(contest => {

                for(var con = 0; con < contest.length; con++){
                    if(contesthandler.contestentry(contest[con].meetingtime) === true){
                        var contestname = contest[con].contestname;
                        registrationCollection.find().toArray()
                        .then(item => {
                            for(var i=0;i< item.length;i++){
                                var em = item[i].email;
                                var pass = item[i].pwd;
                                var age = item[i].age;
                             
                                var contest = item[i].contest;
                                var flag=0;
                                if((password === pass) && (email === em) && (contestname === contest)) {
                                    console.log(age);
                                    roomCollection.find().sort( { age: 1 } ).toArray()
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

})

module.exports = router;
