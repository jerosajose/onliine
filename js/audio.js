// Old HTML audio files
{/* <audio id="startup" src="audio/startup.mp3"></audio>
<audio id="bg-music" src="audio/bg-music.mp3" loop></audio>
<audio id="hover" src="audio/button-hover.mp3"></audio>
<audio id="select" src="audio/button-select.mp3"></audio>
<audio id="zip" src="audio/zip.mp3"></audio>
<audio id="back" src="audio/back.mp3"></audio>
<audio id="start" src="audio/start.mp3"></audio>
<audio id="chSpec" src=""></audio>
<audio id="homeIn" src="audio/home-in.mp3"></audio>
<audio id="homeOut" src="audio/home-out.mp3"></audio>
<audio id="rm1" src="audio/returntomenu-1.mp3"></audio>
<audio id="rm2" src="audio/returntomenu-2.mp3"></audio>
<audio id="nextprev" src="audio/nextprev.mp3"></audio>
<audio id="letterIn" src="audio/letter-in.mp3"></audio> */}

// BG Music
var bgMusic = new Howl({
    src: `audio/bg-music.mp3`,
    volume: 0.2,
    loop: true
});

// Toggle BG Music
function bgMusicToggle() {
    // If BG Music is playing
    if (bgMusic.playing() == true) {
        bgMusic.pause();
    // Or, if it's paused
    } else if (bgMusic.playing() == false) {
        bgMusic.play();
    // Else nothing else!
    } else {
        alert('how the hell the bgmusic get called to stop but it aint even here???');
    }
}

// Play Music
function playMusic(name, vol, loop) {
    // If bgMusic is playing, pause it.
    if (bgMusic.playing() == true) {
        bgMusic.pause();
    }
    // Fail if no file name or vol is set.
    if (!name) return alert('You must provide a file name from the "audio/" dir.!');
    if (!vol) return alert('You must provide a volume value!');
    // Actual Howl
    var music = new Howl({
        src: `audio/${name}`,
        volume: vol,
        // If loop is true, then loop this, duh.
        loop: function () {
            if (loop == true) {
                true;
            } 
        },
        autoplay: true
    });
}

// Play one SFX
function playSFX(name, vol, playafter) {
    // Fail if no file name or vol is set.
    if (!name) return alert('You must provide a file name from the "audio/" dir.!');
    if (!vol) return alert('You must provide a volume value!');
    // Actual Howl
    var sfx = new Howl({
        src: `audio/${name}`,
        volume: vol,
        autoplay: true,
        onend: function () {
            if (playafter == 'bgmusic') {
                bgMusic.play();
            }
        }
    });
}

// Play Multiple SFX (names must be in a Array!)
function playSFXMulti(vol, names) {
    // If names is a Array
    if (Array.isArray(names)) {
        names.forEach(name => {
            var sfx = new Howl({
                src: `audio/${name}`,
                volume: vol,
                autoplay: true
            });
        });
    // Else report back saying I ain't doing it!
    } else {
        alert('playSFXMulti: Your files must in a array!')
    }
}