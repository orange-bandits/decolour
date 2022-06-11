const status = {};

function updateIcon(isEnabled) {
    if (isEnabled) {
        browser.browserAction.setIcon({
            path: {
                "16": "images/grayscale/toolbar-icon-16.png",
                "19": "images/grayscale/toolbar-icon-19.png",
                "32": "images/grayscale/toolbar-icon-32.png",
                "38": "images/grayscale/toolbar-icon-38.png",
                "48": "images/grayscale/toolbar-icon-48.png",
                "72": "images/grayscale/toolbar-icon-72.png"
            }
        });
    } else {
        browser.browserAction.setIcon({
            path: {
                "16": "images/coloured/toolbar-icon-16.png",
                "19": "images/coloured/toolbar-icon-19.png",
                "32": "images/coloured/toolbar-icon-32.png",
                "38": "images/coloured/toolbar-icon-38.png",
                "48": "images/coloured/toolbar-icon-48.png",
                "72": "images/coloured/toolbar-icon-72.png"
            }
        });
    }
}

browser.browserAction.onClicked.addListener(() => {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        const isEnabled = !status[tab.id];
        status[tab.id] = isEnabled;
        browser.tabs.insertCSS(tab.id, {
            cssOrigin: 'user',
            file: 'grayscale.css',
        }).then(() => {
            browser.tabs.executeScript(tab.id, { file: 'toggle-grayscale.js' }).then(() => {
                updateIcon(isEnabled);
            });
        });
    })
});

browser.tabs.onActivated.addListener(({ tabId }) => {
    isEnabled = status[tabId];
    
    updateIcon(isEnabled);
});
