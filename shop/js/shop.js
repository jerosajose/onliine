// Change bg music and load
window.addEventListener('load', () => {
    // Aspect ratio loop
    setInterval(() => {
        let target1 = document.querySelector('#aspectcontainer');
        let target2 = document.querySelector('#bg .dots');
        let scale = Math.min(window.innerWidth / 608, window.innerHeight / 456);
        let top = (window.innerHeight - target1.clientHeight) / 2 + "px";
        let left = (window.innerWidth - target1.clientWidth) / 2 + "px";

        target1.style.scale = scale;
        target2.style.scale = scale;
        target1.style.top = top;
        target2.style.top = top;
        target1.style.left = left;
        target2.style.left = left;
    }, 50);

    // Init buttons
    setTimeout(() => {
        buttonInitHoverSfx();
    }, 100);

    // Music
    startMusic();
});


function startMusic() {
    if (new Date().getDay() === 3) {
        setBGMusic('shop/music/wednesdays.mp3', 'shop/music/intro.mp3');
    } else {
        setBGMusic('shop/music/loop.mp3', 'shop/music/intro.mp3');
    }
}


function initItem(category, id) {
    if (!category || !id) {
        console.error('initItem: category and id are required');
    }
    let categoryName;
    switch (category) {
        case 'vconsole':
            categoryName = 'Virtual Console';
        break;

        case 'wiiware':
            categoryName = 'WiiWare';
        break;

        case 'channels':
            categoryName = 'Wii Channels';
        break;
    }

    let item = shopItems[category].find(item => item.id === id);
    if (!shopItems[category] || !item) {
        console.error('initItem: category or item not found');
    }
    

    // Add item to page
    console.log(item);
    let titles = document.querySelector('.titles');
    titles.insertAdjacentHTML('beforeend', `
        <div class="product" id="${item.id}">
            <div class="preview" style="background: url('/${item.assets}${item.id}/thumb.png');"></div>
            <div class="info">
                <span class="title">${item.title}</span>
                <div class="spacer"></div>
                <div class="below">
                    <span class="publisher">${item.publisher}</span>
                    <span class="category">${categoryName}</span>
                </div>
            </div>
        </div>
    `);
}


function checkItems() {
    let shopItems = document.querySelectorAll('.titles .product');
    shopItems.forEach(item => {
        // Check if item is in the user's channel storage
        if (userChannels.find(channel => channel.id === item.id)) {
            item.setAttribute('downloaded', '');
            item.insertAdjacentHTML('beforeend', `<span class="downlaoded">Downloaded</span>`);
        }
    });
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

        let headerElmnt = document.querySelector('.header');
        headerElmnt.style.color = "#37bef4";
        headerElmnt.innerHTML = 'Wii Shop Channel';
    } else {
        backButton.onclick = () => {
            playSFX('button-cancel.mp3', userConfig.sfxVol);
            changePage('index');
        };
        backButton.innerHTML = 'Back';
    }

    // Init
    includeHTML();
    /// When everything is loaded
    setTimeout(() => {
        // Init store buttons if detected
        let titles = document.querySelector('.titles');
        if (titles) {
            if (titles.getAttribute('category') == 'downloaded') {
                userChannels.forEach(channel => {
                    initItem(titles.getAttribute('category'), channel.id);
                });
            } else {
                shopItems[titles.getAttribute('category')].forEach(channel => {
                    initItem(titles.getAttribute('category'), channel.id);
                });
            }
        }
        // Hover SFX
        buttonInitHoverSfx();
        // Check for rename header
        let renameElmnt = document.querySelector('.rename-header');
        let headerElmnt = document.querySelector('.header');
        if (renameElmnt) {
            headerElmnt.innerHTML = renameElmnt.innerHTML;
            headerElmnt.style.color = 'black';
        }
    }, 50);
}