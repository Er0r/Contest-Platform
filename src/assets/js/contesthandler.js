function check(contestdate){
  
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    const splitdatetime = contestdate.meetingtime.split('T');
    const dates = splitdatetime[0].split('-');
    const contestyear = dates[0];
    const contestmonth = dates[1];
    const contestday = dates[2];      
    const times = splitdatetime[1].split(':');
    const contesthour = times[0];
    const contestminute = times[1];
    console.log(`${contestday} ${contestyear} ${contestmonth} ${date} ${year} ${month}`);
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
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    const splitdatetime = contestdate.meetingtime.split('T');
    const dates = splitdatetime[0].split('-');
    const contestyear = dates[0];
    const contestmonth = dates[1];
    const contestday = dates[2];      
    const times = splitdatetime[1].split(':');
    const contesthour = times[0];
    const contestminute = times[1];
    console.log(`${contestday} ${contestyear} ${contestmonth} ${date} ${year} ${month}`);
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
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    const splitdatetime = contestdate.meetingtime.split('T');
    const dates = splitdatetime[0].split('-');
    const contestyear = dates[0];
    const contestmonth = dates[1];
    const contestday = dates[2];      
    const times = splitdatetime[1].split(':');
    const contesthour = times[0];
    const contestminute = times[1];
    console.log(`${contestday} ${contestyear} ${contestmonth} ${date} ${year} ${month}`);
    if((parseInt(contestday) < parseInt(date)) && (parseInt(contestyear) < parseInt(year)) && (parseInt(contestmonth) < parseInt(month))){
        return true;
    }else  {
        return false;
    }
}


module.exports = {
    check: check,
    upcomingcheck: upcomingcheck,
    finishcheck: finishcheck
}