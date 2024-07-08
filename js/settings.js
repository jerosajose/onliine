/**
 * Initializes the buttons for functionality.
 */
function initSettings() {
    // Buttons
    document.querySelectorAll('#setting-page button').forEach(elmnt => {
        // On hover
        elmnt.addEventListener('mouseover', (event) => {
            playSFX('button-hover.mp3', userConfig.sfxVol);
        });
        // On click
        elmnt.addEventListener('click', (event) => {
            if (elmnt.getAttribute('special') !== "undefined" && elmnt.getAttribute('special') !== null) {
                if (elmnt.getAttribute('special') == "back") {
                    playSFX('button-cancel.mp3', userConfig.sfxVol);
                }
            } else {
                playSFX('button-select-big.mp3', userConfig.sfxVol);
            }
            setSettingsTo(elmnt.getAttribute('goto'));
        });
    });

    // Sliders
    document.querySelectorAll('#setting-page .set-slider input').forEach(elmnt => {
        // On hover
        elmnt.addEventListener('mouseover', (event) => {
            playSFX('button-hover.mp3', userConfig.sfxVol);
        });
        // On change
        elmnt.addEventListener('input', (event) => {
            // Set the value to whatever "saveto" is
            if (elmnt.getAttribute('saveto') !== "undefined") {
                if (userConfig[elmnt.getAttribute('saveto')]) {
                    userConfig[elmnt.getAttribute('saveto')] = elmnt.value;
                    // Save to local storage
                    localStorage.setItem('onliine-settings', JSON.stringify(userConfig));
                } else {
                    console.error(`slider event listener input: ${elmnt.getAttribute('saveto')} is not defined!`)
                }
            } else {
                // This is probably a test slider, so log it
                console.log(`test slider:`, elmnt.value);
            }
        });
    });
};

/**
 * Changes the settings page to a new setting. Initializes the buttons as well.
 *
 * @param {string} target - The target or the name of the setting you'd like to go to.
 */
function setSettingsTo(target) {
    // Make sure target is a string
    target = target.toString();
    // Send the target string to getSettingHtml & set the HTML
    document.getElementById('setting-pages').innerHTML = getSettingHtml(target);
    // Init the buttons
    initSettings();
};

/**
 * Returns the HTML for a settings page.
 *
 * @param {string} target - The target or the name of the setting you'd like to go to.
 * @returns {string} The HTML for the settings page.
 */
function getSettingHtml(target) {
    // Make sure target is a string
    target = target.toString();
    switch (target) {
        case "index":
            return `
            ${makeSettingPage([
                {title: "This is a Test Button", type: "button", goto: "test"},
                {title: "Change System Volume", type: "button", goto: "volume"},
                {title: "Format Wii System Memory", type: "button", goto: "format"},
            ])}

            <div id="setting-page" class="ver">
                <div class="content">
                    Website version&nbsp;<span id="versionprint">a</span><br>
                    Onliine latest available: <span id="updatedver"></span><br>
                    Based upon Wii System 4.3E
                </div>
            </div>
            `;

        case "test":
            return `
            ${makeSettingPage([
                {title: "This is a Test Menu", type: "text"},
                {title: "Return to Settings", type: "button", goto: "index", special: "back"},
                {title: "Test Slider (logged to console)", type: "slider", min: 0, max: 100, step: 1, value: 50},
            ])}
            `;

        case "volume":
            return `
            ${makeSettingPage([ 
                {title: "Sound Effects", type: "slider", min: 0, max: 1, step: 0.05, value: userConfig.sfxVol, saveto: "sfxVol"},
                {title: "Music", type: "slider", min: 0, max: 1, step: 0.05, value: userConfig.musicVol, saveto: "musicVol"},
                {title: "Return to Settings", type: "button", goto: "index", special: "back"},
            ])}
            `;

        case "format":
            return `
            ${makeSettingPage([
                {title: "You can't do this yet, please wait for the next update!!", type: "text"},
                {title: "Return to Settings", type: "button", goto: "index", special: "back"},
            ])}
            `;

    
        default:
            return `
            ${makeSettingPage([
                {title: "the page you're looking for doesn't exist.", type: "text"},
                {title: "Return to Settings", type: "button", goto: "index", special: "back"},
            ])}

            <div id="setting-page" class="ver">
                <div class="content">
                    Website version&nbsp;<span id="versionprint">a</span><br>
                    Onliine latest available: <span id="updatedver"></span><br>
                    Based upon Wii System 4.3E
                </div>
            </div>
            `;
    };
};

/**
 * Makes a new setting page.
 *
 * @param {Array} params - A table of objects that can be buttons, sliders, etc. Example: `[{title: "Test Button", type: "button", goto: "test"}]`
 * @returns {string} A string of the HTML for the settings page.
 */
function makeSettingPage(params) {
    // Make sure params is an array
    if (!Array.isArray(params)) {
        params = [params];
    }
    console.log(params);

    // Loop through params & add to a string
    let html = "";
    params.forEach(param => {
        switch (param.type) {
            case "button":
                let special = '';
                if (param.special == "back") {
                    special = `special="back"`;
                }
                html += `<button class="set-btn" goto="${param.goto}" ${special}>${param.title}</button>`;
            break;

            case "slider":
                html += `
                <div class="set-slider">
                    <h3>${param.title}</h3>
                    <input type="range" min="${param.min}" max="${param.max}" step="${param.step}" value="${param.value}" saveto="${param.saveto}">
                </div>
                `;
            break;

            case "text":
                html += `${param.title}`;
            break;
        
            default:
            return console.error(`makeSettingPage: unknown type: ${param.type}`);
        }
    });

    return `
    <div id="setting-page">
        <div class="content">
            ${html}
        </div>
    </div>
    `;
}

/* <div id="setting-page">
    <div class="content">
        <button class="set-btn" goto="test">This is a Test Button</button>
        <button class="set-btn" goto="volume">Change System Volume</button>
        <button class="set-btn" goto="format">Format Wii System Memory</button>
    </div>
</div>
<div id="setting-page">
    <div class="content">
        <button class="set-btn" goto="test">This is a Test Button</button>
    </div>
</div>
<div id="setting-page" class="ver">
    <div class="content">
        Website version&nbsp;<span id="versionprint">a</span><br>
        Onliine latest available: <span id="updatedver"></span><br>
        Based upon Wii System 4.3E
    </div>
</div> */