// Default config
var def_config = {
    musicVol: 0.5,
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
    {
        id: 'disc',
        title: 'Disc Channel',
        assets: 'assets/channels/',
        channelart: 'channelart/',
        disc: true
    },
    {
        id: 'mii',
        title: 'Mii Channel',
        assets: 'assets/channels/',
        channelart: 'channelart/'
    },
    {
        id: 'photo',
        title: 'Photo Channel',
        assets: 'assets/channels/',
        channelart: 'channelart/'
    },
    {
        id: 'shop',
        title: 'Wii Shop Channel',
        assets: 'assets/channels/',
        channelart: 'channelart/',
        target: '/shop'
    },
    {
        id: 'news',
        title: 'News Channel',
        assets: 'assets/channels/',
        channelart: 'channelart/'
    },
    {
        id: 'onliine',
        title: 'Onliine Channel',
        assets: 'assets/channels/',
        channelart: 'channelart/',
        target: '//github.com/Ascript89/onliine'
    }
]

// Set channels if they aren't set
if (!localStorage.getItem('onliine-channels')) {
    localStorage.setItem("onliine-channels", JSON.stringify(def_channels));
}
var userChannels = JSON.parse(localStorage.getItem('onliine-channels'));
console.log(`user channels: `, userChannels);

// Load default config
function resetConfig(confirm) {
    if (confirm == true) {
        // Confirmed! writing...
        localStorage.setItem("onliine-settings", JSON.stringify(def_config));
        userConfig = JSON.parse(localStorage.getItem('onliine-settings'));
        console.log(`user config reset!:`, userConfig);
    } else {
        console.error(`loadDefaultConfig: MAKE SURE YOU'D LIKE TO DO THIS BY USING "loadDefaultConfig(true)". THERE'S NO TURNING BACK!!`)
    }
}

// Load default channels
function resetChannels(confirm) {
    if (confirm == true) {
        // Confirmed! writing...
        localStorage.setItem("onliine-channels", JSON.stringify(def_channels));
        userChannels = JSON.parse(localStorage.getItem('onliine-channels'));
        console.log(`user channels reset! (reload page to see):`, userChannels);
    } else {
        console.error(`loadDefaultChannels: MAKE SURE YOU'D LIKE TO DO THIS BY USING "loadDefaultConfig(true)". THERE'S NO TURNING BACK!!`)
    }
}