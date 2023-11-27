// Add channels that user has in their channel storage.
window.onload = function () {
    for (const channel of userChannels) {
        // Get the first blank channel
        var target = document.getElementsByClassName('ch blank')[0];

        // First, we remove the "blank" class name & add "occupied".
        target.classList.remove('blank');
        target.classList.add('occupied');

        // Now, we inject stuff from the channel config in the target.
        target.setAttribute('data-id' , channel.id);
        // Add target href if channel has a target
        if (channel.target) {
            target.setAttribute('data-href', channel.target)
        }
        // If is a disc channel
        var hasDisc;
        if (channel.disc == true) {
            hasDisc = 'id="discTag"';

            target.insertAdjacentHTML(`afterbegin`,
            
            `
            <img src="channelart/disc/disc.png" class="spinnin" />
            `
            )
        }
        // Main inject
        target.insertAdjacentHTML('afterbegin', 
        
        `
        <iframe src="channelart/${channel.id}/channel.html"></iframe>
        <div class="onhover" onmouseover="playSFX('button-hover.mp3', 0.2)" onclick="zip()"></div>
        <span class="tag" ${hasDisc}>${channel.title}</span>
        `
        )
    }
}