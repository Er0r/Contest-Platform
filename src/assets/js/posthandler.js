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
var count = 0;

firebase.database().ref('/user/question'+r).on('value', function(snapshot){
    if(snapshot.val().teamName && count === 0){
        teamid.innerHTML = `Welcome Team: ${snapshot.val().teamName}` 
        teamdiv.style.display = 'block';
        setteamdiv.style.display = 'none';
        count++;
    }
    
})


function teamhandler(){
    var name = teamname.value; // AIUB_ZIP_zAP
    sessionStorage.setItem('teamName',name);
    
    ref.set({ 
        teamName: name,
        ContestName: sessionStorage.getItem('ContestName')
    })
    teamid.innerHTML = `<h1>Welcome Team: ${name}</h1>`
    teamdiv.style.display = 'block';
    setteamdiv.style.display = 'none';
}

confirmbtn.addEventListener('click',teamhandler)

firebase.database().ref('/user/question'+r).on('value', function(snapshot){
    if(snapshot.val().questions)
        cardContent.innerHTML=snapshot.val().questions;
});


function myFunction() {
    var myVar = setInterval(alertFunc, 10000); // changed refresh timer
}



function alertFunc(){
    var data = CKEDITOR.instances['content'].getData();
    console.log(data);
    console.log(window.location.pathname);
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

//Timer
function initializeTimer() {
    if(!localStorage.getItem('time'+r))
    {
        var fiveMinutes = 60 * 120,
        display = document.querySelector('#time');
        startTimer(fiveMinutes, display);
        localStorage.setItem('time'+r, fiveMinutes);
    } else{
        var fiveMinutes = localStorage.getItem('time'+r),
        display = document.querySelector('#time');
        startTimer(fiveMinutes, display);
    }
    
};

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
            window.location.replace("../../");
        }
    }, 1000);
}
            