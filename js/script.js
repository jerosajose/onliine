// TIME AND DATE
function showDateTime() {
    var hourDiv = document.getElementById("hour");
    var dateDiv = document.getElementById("date");
    var dateDiary = document.getElementById("date2");
  
    var date = new Date();
    var dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var monthNames = ["1","2","3","4","5","6","7","8","9","10","11","12"];
    var dayName = dayList[date.getDay()];
    var monthName = monthNames[date.getMonth()];
    var today = `${dayName} ${date.getDate()}/${monthName}`;
  
    var hour = date.getHours();
    var min = date.getMinutes().toString().padStart(2, '0');

    var time = hour + ":" + min;
    
    hourDiv.innerText = `${time}`;
    dateDiv.innerText = `${today}`;
    dateDiary.innerText = `${today}`;
}
setInterval(showDateTime, 1000);

// UI SFX
function hover() {
    var audio = document.getElementById("hover");
    audio.play();
}

function select() {
    var audio = document.getElementById("select");
    audio.play();
}

function bgmus() {
    var audio = document.getElementById('bg-music');
    audio.play();
}

function bgmusPause() {
    var audio = document.getElementById("bg-music");
    audio.pause();
}

function zip() {
    var audio = document.getElementById("zip");
    audio.play();
    select();
    var music = document.getElementById("bg-music");
    music.pause();
}

function back() {
    var audio = document.getElementById("back");
    audio.play();
}

function startAudio() {
    var audio = document.getElementById("start");
    audio.play();
}

function homeIn() {
    var audio = document.getElementById('homeIn');
    audio.play();
}

function homeOut() {
    var audio = document.getElementById('homeOut');
    audio.play();
}

function rm1() {
    var audio = document.getElementById("rm1");
    audio.play();
}

function nextprev() {
    var audio = document.getElementById("nextprev");
    audio.play();
}

function rm2() {
    var audio = document.getElementById("rm2");
    audio.play();
    setTimeout(() => {document.body.classList.add("fadeOut");}, 1000);
    setTimeout(() => {window.location.href = "/";}, 1500);
}

function settingsIn() {
    var audio = document.getElementById("start");
    audio.play();
    setTimeout(() => {document.body.classList.add("fadeOut");}, 0);
    setTimeout(() => {window.location.href = "/settings";}, 1000);
}

function letterIn() {
    var audio = document.getElementById("letterIn");
    audio.play();
}

// AUDIO AUTOPLAY
setTimeout(() => {
    var music = document.getElementById('startup');
    music.volume = 0.2;
    var promise = music.play();
    if (promise !== undefined) {
        promise.then(_ => {
            console.log('start up sound');
        }).catch(error => {
            console.log('FAILED AT start up sound');
            music.muted = true;
            music.play();
            music.muted = false;
        });
    }

    var music = document.getElementById('bg-music');
    music.volume = 0.2;
    var promise = music.play();
    if (promise !== undefined) {
        promise.then(_ => {
            console.log('background music on loop play');
        }).catch(error => {
            console.log('FAILED AT bg music loop');
            music.muted = true;
            music.play();
            music.muted = false;
        });
    }
}, 3000);