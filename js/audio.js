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

function playMusic(name, vol, loop) {
    // Fail if no file name or vol is set.
    if (!name) return alert('You must provide a file name from the "audio/" dir.!');
    if (!vol) return alert('You must provide a volume value!');
    // Actual Howl
    var music = new Howl({
        src: `audio/${name}`,
        volume: vol,
        loop: true,
        autoplay: true
    });
}

function playSFX(name, vol) {
    // Fail if no file name or vol is set.
    if (!name) return alert('You must provide a file name from the "audio/" dir.!');
    if (!vol) return alert('You must provide a volume value!');
    // Actual Howl
    var sfx = new Howl({
        src: `audio/${name}`,
        volume: vol,
        autoplay: true
    });
}