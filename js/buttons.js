var buttonsList = [
    ".returndialog .actions a",
    ".buttonlikeshop",
    ".buttonlikeshop2",
    ".titles .product"
]

function buttonInitHoverSfx () {
    // Look for all the buttons on any page.
    buttonsList.forEach(buttonName => {
        if (document.querySelectorAll(buttonName).length > 0) {
            // On hover sound
            document.querySelectorAll(buttonName).forEach(elmnt => {
                if (!elmnt.getAttribute('sfxOn') || elmnt.getAttribute('sfxOn') !== 'true') {
                    elmnt.addEventListener('mouseenter', (event) => {
                        playSFX('button-hover.mp3', userConfig.sfxVol);
                    });
                    elmnt.setAttribute('sfxOn', true);
                }
            });
        }
    });
}