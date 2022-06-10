const status = {};

browser.browserAction.onClicked.addListener(() => {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        status[tab.id] = !status[tab.id];
        browser.tabs.insertCSS(tab.id, {
            cssOrigin: 'user',
            file: 'grayscale.css',
        }).then(() => {
            browser.tabs.executeScript(tab.id, { file: 'toggle-grayscale.js'
            });
        });
    })
});
