// Add channel
// Adds to channel config too.
// Defaults: addChannel('id', 'Title', 'path-to-assets', 'path-to-channelart')
// (Everything else is optional)
function addChannel(id, title, assets, channelart, target, videoformat) {
    // Check stuff that's required
    function def_cmd() {
        console.log(`Defaults: addChannel('id', 'Title', 'path-to-assets[/]', 'path-to-channelart[/]', [optional: 'target-to-html', 'video-format (recommend webp!)'] )`);
    }
    function logErr(msg, defcmd) {
        if (defcmd == true) def_cmd();
        console.error(`addChannel: ${msg}`);
        return { err: true, msg: msg };
    }
    if (!id) {
        let msg = `You must supply a id!`;
        return logErr(msg, true);
    // Also check for each channel that the users has, make sure the "id" isn't taken.
    } else if (userChannels.find((element) => element.id === id)) {
        let msg = `You already have a channel with that id!`;
        return logErr(msg);
    } else if (!title) {
        let msg = `You must supply a title!`;
        return logErr(msg, true);
    } else if (!assets) {
        let msg = `You must supply the assets directory! (Don't include the id with this var)`;
        return logErr(msg, true);
    } else if (!assets.endsWith('/')) {
        let msg = `Your assets folder doesn't end with a "/"! Please fix that!`;
        return logErr(msg, true);
    } else if (!channelart) {
        let msg = `You must supply the channelart directory! (Don't include the id with this var)`;
        return logErr(msg, true);
    } else if (!channelart.endsWith('/')) {
        let msg = `Your channelart folder doesn't end with a "/"! Please fix that!`;
        return logErr(msg, true);

    // Pass!!!!!!
    } else {
        // Channel.
        var channel = {
            id: id,
            title: title,
            assets: assets,
            channelart: channelart
        }
        // If there's a target, add it.
        if (target) {
            channel.target = target;
        }
        if (videoformat) {
            channel.videoformat = videoformat;
        }
        
        // Push to userChannels & storage.
        userChannels.push(channel);
        localStorage.setItem("onliine-channels", JSON.stringify(userChannels));
        console.log(`new channel storage: `, userChannels);
        return 'Please reload this page to see your new channel!';
    }
}

function makeChannel(channeljson) {
    // Get the first blank channel
    var target = document.getElementsByClassName('ch blank')[0];

    // First, we remove the "blank" class name & add "occupied".
    target.classList.remove('blank');
    target.classList.add('occupied');

    // Now, we inject stuff from the channel config in the target.
    target.setAttribute('data-id' , channeljson.id);
    // Add target href if channel has a target
    if (channeljson.target) {
        target.setAttribute('data-href', channeljson.target)
    }
    // If is a disc channel
    hasDisc = '';
    if (channeljson.disc == true) {
        hasDisc = 'id="discTag"';

        target.insertAdjacentHTML(`afterbegin`,
        
        `
        <img src="channelart/disc/disc.png" class="spinnin" />
        `
        )
    }
    // Main inject
    // If channel has the 'custom' var:
    target.insertAdjacentHTML('afterbegin', 
    
    `
    <iframe src="${channeljson.channelart}${channeljson.id}/channel.html"></iframe>
    <div class="onhover" onmouseover="playSFX('button-hover.mp3', 0.2)" onclick="zip()"></div>
    <span class="tag" ${hasDisc}>${channeljson.title}</span>
    `
    )
}

// Remove channel
// Removes from channel config too.
function removeChannel(id) {
    // Find channel by id.
    var channel = userChannels.findIndex((element) => element.id === id);

    // If couldn't find the channel
    if (!channel) {
        console.error('removeChannel: Couldn\'t find a channel with that id!');
    }

    // Remove class name 'occupied'
    var targetDiv = $(`[data-id="${id}"]`)[0];
    targetDiv.classList.remove('occupied');
    // Remove all child nodes
    while (targetDiv.firstChild) {
        targetDiv.removeChild(targetDiv.firstChild);
    }
    // Make it blank
    targetDiv.classList.add('blank');
    // Move it to the bottom to re-align all the other channels
    targetDiv.parentNode.appendChild(targetDiv);

    // Splice from userChannels
    userChannels.splice(channel, 1)
    console.log(`removed channel '${id}': `, userChannels);
    // Edit local storage
    localStorage.setItem("onliine-channels", JSON.stringify(userChannels));
}