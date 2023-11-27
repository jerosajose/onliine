// Default config
var def_config = {
    musicVol: 0.2,
    sfxVol: 0.2,
}

// Check if Local Storage is accessable
if (typeof(Storage) !== "undefined") {
    if (!localStorage.getItem('onliine-settings')) {
        // Stringify the config cuz that's how it is.
        localStorage.setItem("onliine-settings", JSON.stringify(def_config));
    }
} else {
    alert('Local Storage is not support or disabled -- settings will not work!')
}

// User config
var userConfig = JSON.parse(localStorage.getItem('onliine-settings'));
console.log(`user config:`, userConfig);

// Default channels
var def_channels = [
    'disc',
    'mii',
    'photo',
    'shop',
    'news',
    'onliine'
]
// Set channels
if (!localStorage.getItem('onliine-channels')) {
    localStorage.setItem("onliine-channels", JSON.stringify(def_channels));
}
var userChannels = JSON.parse(localStorage.getItem('onliine-channels'));
console.log(`user channels: `, userChannels);