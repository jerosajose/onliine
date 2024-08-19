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
            document.querySelectorAll(buttonName).forEach(elmnt => {

                // On hover
                if (!elmnt.getAttribute('sfxOn') || elmnt.getAttribute('sfxOn') !== 'true') {
                    elmnt.addEventListener('mouseenter', (event) => {
                        playSFX('button-hover.mp3', userConfig.sfxVol);
                    });
                    elmnt.setAttribute('sfxOn', true);
                }

                // Shop buttons
                if (buttonName === ".buttonlikeshop" || buttonName === ".buttonlikeshop2") {
                    if (!elmnt.parentElement.classList.contains('bottom')) {
                        elmnt.addEventListener('click', (event) => {
                            playSFX('button-select-big.mp3', userConfig.sfxVol);
    
                            if (elmnt.getAttribute('page')) {
                                changePage(elmnt.getAttribute('page'));
                            }
                        });
                    }
                }

            });
        }
    });
}