var moment = require('moment');

function check(contestdate){
    let contesttime =  moment().format(contestdate.meetingtime);
    var today = moment().add(2, 'hours');
    var status = today.to(contesttime);

    if(status.includes('hours ago')){
        return false;
    }
    return true;
}

function upcomingcheck(contestdate) {
   
    let contesttime =  moment().format(contestdate.meetingtime);
    var today = moment().add(2, 'hours');
    var status = today.to(contesttime);
    if(status.includes('ago')){
        return false;
    }
    return true;
}

function finishcheck(contestdate) {
    let contesttime =  moment().format(contestdate.meetingtime);
    var today = moment().add(2, 'hours');
    var status = today.to(contesttime);
    if(status.includes('ago')){
        return true;
    }
    return false;
}


function contestentry(contestdate){
    let contesttime =  moment().format(contestdate.meetingtime);
    var today = moment().add(2, 'hours');
    var status = today.to(contesttime);
    console.log(status);
    if(status.includes(`5 minutes`) || status.includes(`4 minutes`) || status.includes(`3 minutes`) || status.includes(`2 minutes`) || status.includes(`1 minutes`) ||  status.includes(`0 minutes`) || status.includes(`minutes ago`) || status.includes(`seconds ago`)){
        console.log('ok');
        return true;
    }
    return false;
}

module.exports = {
    check: check,
    upcomingcheck: upcomingcheck,
    finishcheck: finishcheck,
    contestentry: contestentry
}