const { contextBridge } = require('electron');


// Expose protected methods that allow the renderer process to use
contextBridge.exposeInMainWorld('info', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    getIndexPage: () => {
        // This is used because electron uses the "file://" origin and
        // makes things impossible to change the page in the browser.
        return `file:///${__dirname.replace('\\', '/')}/index.html`;
    }
});