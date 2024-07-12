// Change bg music and load
window.onload = () => {
    startMusic();
}


function startMusic() {
    if (new Date().getDay() === 3) {
        setBGMusic('shop/music/wednesdays.mp3', 'shop/music/intro.mp3');
    } else {
        setBGMusic('shop/music/loop.mp3', 'shop/music/intro.mp3');
    }
}

/**
 * Function to change the page content based on the provided htmlName.
 *
 * @param {string} htmlName - The name of the HTML page (without the ".html" extension) to be displayed.
 * @return {void} This function does not return any value.
 */
function changePage(htmlName) {
    let target = document.querySelector('#contentframe');
    let backButton = document.querySelector('.bottom .back');
    let htmlNameBack;

    // Make htmlNameBack
    if (htmlName.split('/').length > 1) {
        htmlNameBack = htmlName.split('/')[0];
    }

    // Clear and change "from-html"
    target.innerHTML = '';
    target.setAttribute('from-html', `pages/${htmlName}.html`);

    // Check if "htmlName" is "index"
    if (htmlName === 'index') {
        backButton.onclick = () => {
            playSFX('button-cancel.mp3', userConfig.sfxVol);
            window.location.href = '/?skipwarn=true';
        };
        backButton.innerHTML = 'Wii Menu';
    } else {
        backButton.onclick = () => {
            playSFX('button-cancel.mp3', userConfig.sfxVol);
            changePage('index');
        };
        backButton.innerHTML = 'Back';
    }

    // Init
    includeHTML();
    setTimeout(() => {
        buttonInitHoverSfx();
    }, 100);
}