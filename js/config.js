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
        // Reload the page so that everything works.
        location.reload();
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
        target: 'shop/index.html'
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

// Instead of setting the default channels in say "userChannels", we'll put them in a different item in Local Storage.
// This way we can make sure everything goes wrong in there and not have to worry about the defaults not working.
// Also check for items that possibly don't exist.
if (!localStorage.getItem('onliine-default-channels')) {
    localStorage.setItem("onliine-default-channels", JSON.stringify(def_channels));
}
if (!localStorage.getItem('onliine-igrore-default-channels')) {
    localStorage.setItem("onliine-ignore-default-channels", JSON.stringify({}));
}
if (!localStorage.getItem('onliine-channels')) {
    localStorage.setItem("onliine-channels", JSON.stringify({}));
}
if (!localStorage.getItem('onliine-channel-configs')) {
    localStorage.setItem("onliine-channel-configs", JSON.stringify({}));
}

var defaultChannels = JSON.parse(localStorage.getItem('onliine-default-channels'));
var userChannels = JSON.parse(localStorage.getItem('onliine-channels'));
var ignoredDefaultChannels = JSON.parse(localStorage.getItem('onliine-igrore-default-channels'));
var channelConfigs = JSON.parse(localStorage.getItem('onliine-channel-configs'));
// From here, we can also check if the item needs changes.
if (JSON.stringify(def_channels) != JSON.stringify(defaultChannels)) {
    console.log('Detected changes to default channels!');
    localStorage.setItem("onliine-default-channels", JSON.stringify(def_channels));
}
// For older configs (which can be removed after a while)
if (userChannels && userChannels[2] && userChannels[2].id == 'photo') {
    localStorage.setItem("onliine-channels", JSON.stringify({}));
    location.reload();
}
console.log(`default channels: `, defaultChannels);


// Reset default channels
function resetDefaultChannels(confirm) {
    if (confirm == true) {
        // Confirmed! writing...
        localStorage.setItem("onliine-default-channels", JSON.stringify(def_channels));
        defaultChannels = JSON.parse(localStorage.getItem('onliine-default-channels'));
        console.log(`default channels reset! (reload page to see):`, defaultChannels);
    } else {
        console.error(`resetDefaultChannels: MAKE SURE YOU'D LIKE TO DO THIS BY USING ADDING "true" IN THE FUNCTION. THERE'S NO TURNING BACK!!`)
    }
}

// Reset user channels
function resetUserChannels(confirm) {
    if (confirm == true) {
        // Confirmed! writing...
        localStorage.setItem("onliine-channels", JSON.stringify(def_channels));
        userChannels = JSON.parse(localStorage.getItem('onliine-channels'));
        console.log(`user channels reset! (reload page to see):`, userChannels);
    } else {
        console.error(`resetUserChannels: MAKE SURE YOU'D LIKE TO DO THIS BY USING ADDING "true" IN THE FUNCTION. THERE'S NO TURNING BACK!!`)
    }
}

// Reset ignored default channels
function resetIgnoredChannels(confirm) {
    if (confirm == true) {
        // Confirmed! writing...
        localStorage.setItem("onliine-igrore-default-channels", JSON.stringify(def_channels));
        ignoredDefaultChannels = JSON.parse(localStorage.getItem('onliine-igrore-default-channels'));
        console.log(`ignored channels reset! (reload page to see):`, ignoredDefaultChannels);
    } else {
        console.error(`resetIgnoredChannels: MAKE SURE YOU'D LIKE TO DO THIS BY USING ADDING "true" IN THE FUNCTION. THERE'S NO TURNING BACK!!`)
    }
}

// Reset channel configs
function resetConfig(confirm) {
    if (confirm == true) {
        // Confirmed! writing...
        localStorage.setItem("onliine-channel-configs", JSON.stringify({}));
        channelConfigs = JSON.parse(localStorage.getItem('onliine-channel-configs'));

        console.log(`channel configs reset!:`, channelConfigs);
    } else {
        console.error(`resetConfig: MAKE SURE YOU'D LIKE TO DO THIS BY USING "loadDefaultConfig(true)". THERE'S NO TURNING BACK!!`)
    }
}


// Add or edit a value in a channel config
function editChannelConfig(key, value) {
    if (channelID) {
        if (!channelConfigs[channelID]) {
            channelConfigs[channelID] = {};
        }
        channelConfigs[channelID][key] = value;
        console.log(channelConfigs[key]);
        localStorage.setItem("onliine-channel-configs", JSON.stringify(channelConfigs));
    } else {
        alert('There is not "channelID" varaible set. Please add one before trying to edit the channel config!')
    }
}

// Get a value from a channel config
function getChannelConfigKey(key) {
    if (channelID) {
        if (!channelConfigs[channelID]) {
            channelConfigs[channelID] = {};
        }
        return channelConfigs[channelID][key];
    } else {
        alert('There is not "channelID" varaible set. Please add one before trying to get the channel config!')
    }
}