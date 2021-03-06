const post = document.getElementById('postbtn');
const cardContent = document.getElementById('card');
const leaveRoom = document.getElementById('leavebtn');
var r = window.location.pathname;
var ref = firebase.database().ref('/user/question'+r);
var reftime = firebase.database().ref('/user/time'+r);
const teamname = document.getElementById('teamname');
const confirmbtn = document.getElementById('confirmbtn');
const teamid = document.getElementById('teamid');
const teamdiv = document.getElementById('teamdiv');
const setteamdiv = document.getElementById('setteamdiv');
const waitingdiv = document.getElementById('waitingdiv');
var count = 0;

var myVar = setInterval(initialize_members, 30000);

function initialize_members(){
    // if(sessionStorage.getItem('capacity') >= 1 && sessionStorage.getItem('capacity') <= 3){
    //     location.reload();
    //     console.log(`${sessionStorage.getItem('capacity')} jon ache, aro niye ay, naile fot`);
    //     waitingdiv.hidden = false;
    // }
    
    // else if(sessionStorage.getItem('capacity') >= 4){
    //     clearInterval(myVar);
    //     console.log('okey');
    //     waitingdiv.hidden = true;
    //     post.hidden = false;
    //     confirmbtn.hidden = false;
    //     leaveRoom.hidden = false;
    // }
    // clearInterval(myVar);
    console.log('okey');
    waitingdiv.hidden = true;
    post.hidden = false;
    confirmbtn.hidden = false;
    // leaveRoom.hidden = false;
}

initialize_members();

firebase.database().ref('/user/question'+r).on('value', function(snapshot){
    if(snapshot.val().teamName && count === 0){
        teamid.innerHTML = `${snapshot.val().teamName}` 
        setteamdiv.style.display = 'none';
        teamdiv.style.display = 'block';   
        count++;   
    }
})

confirmbtn.addEventListener('click', teamhandler)

function teamhandler(){
    var name = teamname.value; // AIUB_ZIP_zAP
    sessionStorage.setItem('teamName',name);
    
    ref.set({ 
        teamName: name,
        ContestName: sessionStorage.getItem('ContestName')
    })
    teamid.innerHTML = `${name}`
    teamdiv.style.display = 'block';
    setteamdiv.style.display = 'none';
}


firebase.database().ref('/user/question'+r).on('value', function(snapshot){
    if(snapshot.val().questions)
        cardContent.innerHTML=snapshot.val().questions;
});


function myFunction() {
    var myVar = setInterval(alertFunc, 10000); // changed refresh timer
}



function alertFunc(){
    var data = CKEDITOR.instances['content'].getData();

}

window.onload = function(){
    myFunction();
}

post.addEventListener('click', (e)=>  {
    // console.log('Button Is Clicked!');
    e.preventDefault();
    var data = CKEDITOR.instances['content'].getData();
    var teamname = teamid.innerHTML;
    if(!teamname){
        alert('Please Enter Your Team Name');
    } else {
        ref.set({
            roomlink: window.location.pathname,
            questions: data,
            teamName: teamname,
            ContestName: sessionStorage.getItem('ContestName')
        });
    }
    
});


function showTime(){
    firebase.database().ref('/user/time'+r).on('value', function(snapshot){
        var display = document.querySelector('#time');
        display.textContent = snapshot.val().minutes +' : '+ snapshot.val().seconds;  
    });
}

var calltimer ;
function initializeTimer(timeinterval) {
    calltimer = setInterval(timer,timeinterval);
};

function timer() {
    clearInterval(calltimer);
    clearInterval(myVar);
    if(!localStorage.getItem('time'+r))
    {
        var fiveMinutes = 60 * 120

        // localStorage.setItem('time'+r, fiveMinutes);
    } else{
        var fiveMinutes = localStorage.getItem('time'+r)  
    }
    display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        reftime.set({
            minutes: minutes,
            seconds: seconds
        })
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        // display.textContent = minutes + ":" + seconds;
        localStorage.setItem('time'+r, timer);
        if (--timer < 0) {
            timer = duration;
            location.replace('/');
        }
    }, 1000);
}
            