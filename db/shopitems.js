var shopItems;
setTimeout(() => {
    shopItems = {
        vconsole: [],
        wiiware: [],
        channels: [
            {
                id: "homebrew",
                title: "Homebrew Channel",
                assets: "assets/channels/",
                channelart: "channelart/",
                publisher: "Onliine",
            },
            {
                id: "bottomgear",
                title: "BOTTOM GEAR™",
                assets: "assets/channels/",
                channelart: "channelart/",
                publisher: "Onliine",
            }
        ],
        downloaded: userChannels,
        defaults: defaultChannels
    }
}, 100);