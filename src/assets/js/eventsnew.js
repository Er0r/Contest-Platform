import helpers from './helpers.js';
document.getElementById('create-room').addEventListener('click', (e)=>{
    e.preventDefault();

    document.querySelector('#err-msg').innerHTML = "";


    let roomLink = `${location.origin}/room=_${helpers.generateRandomString()}`;
    console.log('Etai '+ roomLink);
    document.querySelector('#room-created').innerHTML = `Room successfully created. Click <a href='${roomLink}'>here</a> to enter room. And Click Twice to enter the room`;
    document.querySelector('#room-name').value = '';
    document.querySelector('#your-name').value = '';
});

