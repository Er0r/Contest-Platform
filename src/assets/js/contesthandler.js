function check(contestdate){
  
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    const splitdatetime = contestdate.meetingtime.split('T');
    const dates = splitdatetime[0].split('-');
    const contestyear = dates[0];
    const contestmonth = dates[1];
    const contestday = dates[2];      
    const times = splitdatetime[1].split(':');

    
    if((parseInt(contestday) === parseInt(date)) && (parseInt(contestyear) === parseInt(year)) && (parseInt(contestmonth) === parseInt(month))){
        return true;
    } else {
        return false;
    }
}

function upcomingcheck(contestdate) {
   
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    const splitdatetime = contestdate.meetingtime.split('T');
    const dates = splitdatetime[0].split('-');
    const contestyear = dates[0];
    const contestmonth = dates[1];
    const contestday = dates[2];      
    const times = splitdatetime[1].split(':');

    
    if((parseInt(contestday) > parseInt(date)) && (parseInt(contestyear) >= parseInt(year)) && (parseInt(contestmonth) >= parseInt(month))){
        return true;
    } else if((parseInt(contestday) < parseInt(date)) && (parseInt(contestyear) > parseInt(year)) && (parseInt(contestmonth) >= parseInt(month))){
        return true;
    } else if((parseInt(contestday) < parseInt(date)) && (parseInt(contestyear) >= parseInt(year)) && (parseInt(contestmonth) > parseInt(month))) {
        return true;
    } else {
        return false;
    }
}

function finishcheck(contestdate) {
    
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    const splitdatetime = contestdate.meetingtime.split('T');
    const dates = splitdatetime[0].split('-');
    const contestyear = dates[0];
    const contestmonth = dates[1];
    const contestday = dates[2];      
    const times = splitdatetime[1].split(':');

  
    if((parseInt(contestday) < parseInt(date)) && (parseInt(contestyear) <= parseInt(year)) && (parseInt(contestmonth) <= parseInt(month))){
        return true;
    }else  {
        return false;
    }
}


//Time Check 

function contestentry(contestdate){
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    const splitdatetime = contestdate.split('T');
    const dates = splitdatetime[0].split('-');
    const contestyear = dates[0];
    const contestmonth = dates[1];
    const contestday = dates[2];      
    const times = splitdatetime[1].split(':');
    const contesthour = times[0];
    const contestminute = times[1];
    console.log(`contesthours - hours ${parseInt(contesthour - parseInt(hours))}`);
    console.log(`contestminute - minutes ${parseInt(contestminute - parseInt(minutes))}`);

    if((parseInt(contestday) === parseInt(date)) && (parseInt(contestyear) === parseInt(year)) && (parseInt(contestmonth) === parseInt(month))){
        if((parseInt(contesthour) === parseInt(hours))) {
            return true;
        } else if((parseInt(contesthour) - parseInt(hours) < 1) && parseInt(contesthour - parseInt(hours) >= -1)) {
            return true;
        } else if((parseInt(contesthour) - parseInt(hours) === 1)) {
            temp_contestminute = parseInt(contestminute) + 60;
            temp_minute = minutes;
            if((parseInt(temp_contestminute) - parseInt(temp_minute)) < 6) {
                return true;
            }
        }
    } else {
        return false;
    }
}

module.exports = {
    check: check,
    upcomingcheck: upcomingcheck,
    finishcheck: finishcheck,
    contestentry: contestentry
}