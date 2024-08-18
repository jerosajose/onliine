// HOME/PAUSE MENU
window.addEventListener("load", () => {
    document.body.insertAdjacentHTML("beforeend", `
        <div class="home-menu">
            <div class="bar-top close-pause-menu">
                <span>HOME Menu</span>
                <img src="/assets/home-close.png" />
            </div>
            <div class="in-between">
                <a class="buttonlike backtomenu" onmouseover="playSFX('button-hover.mp3', userConfig.sfxVol)">Wii Menu</a>
                <!-- <a class="buttonlike" onclick="window.location.reload()">Reset</a> -->
            </div>
            <div class="bar-bottom">
                <img src="/assets/remote.png" class="remote" />
                <div>
                    <div class="battery">
                        <div>
                            <span>P1</span>
                            <img src="/assets/power-full.png" />
                        </div>
                        <div>
                            <span>P2</span>
                            <img src="/assets/power-empty.png" />
                        </div>
                        <div>
                            <span>P3</span>
                            <img src="/assets/power-empty.png" />
                        </div>
                        <div>
                            <span>P4</span>
                            <img src="/assets/power-empty.png" />
                        </div>
                    </div>
                    <div class="text">Wii Remote Settings</div>
                </div>
            </div>
        </div>

        <div class="returndialog">
            <div class="msgbox">
                <div class="text">
                    Return to the Wii Menu?<br>
                    (Anything not saved will be lost.)
                </div>
                <div class="actions">
                    <a onclick="rm2();" onmouseover="playSFX('button-hover.mp3', userConfig.sfxVol)">Yes</a>
                    <a class="closedialog" onmouseover="playSFX('button-hover.mp3', userConfig.sfxVol)" onclick="playSFX('button-cancel.mp3', userConfig.sfxVol)">No</a>
                </div>
            </div>
        </div>
    `);

    var lastBgMusicState;

    if (document.addEventListener) {
        // Right click event for home menu
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            if ($('.home-menu')[0].ariaLabel !== 'on') {
                lastBgMusicState = getBGMusicState();
                // Get bgMusic intro state & pause if it's playing
                if (getBGMusicState().intro) bgMusicIntroToggle();
                // Get bgMusic main state & pause if it's playing
                if (getBGMusicState().main) bgMusicToggle();
                playSFX(`home-in.mp3`, userConfig.sfxVol);
                $(".home-menu").css("display", "grid");
                $('.home-menu')[0].ariaLabel = 'on';
            }
        }, false);
    }
    else {
        document.attachEvent('oncontextmenu', function() {
            alert("EXCEPTION HANDLED: Failed to open Home/Pause menu.\nPlease report any bugs to the Everybody Votes channel.");
            window.event.returnValue = false;
        });
    }

    $(".close-pause-menu").click(event => {
        $(".home-menu").addClass("fadeOut");
        setTimeout(() => {
            $(".home-menu").css("display", "none");
            $(".home-menu").removeClass("fadeOut");
        }, 250);
        playSFX('button-cancel.mp3', userConfig.sfxVol);
        // Get bgMusic intro state & pause if it's playing
        if (lastBgMusicState.intro) bgMusicIntroToggle();
        // Get bgMusic main state & pause if it's playing
        if (lastBgMusicState.main) bgMusicToggle();
        $('.home-menu')[0].ariaLabel = null;
    });

    $(".backtomenu").click(event => {
        $(".returndialog").css("display", "flex");
        playSFX('button-select-big.mp3', userConfig.sfxVol);
    });

    $(".closedialog").click(event => {
        $(".returndialog").css("display", "none");
    });
});