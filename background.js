var test = 'yes';
chrome.browserAction.onClicked.addListener(function(tab) {
    console.log(tab);
    if (tab.url == 'https://www.facebook.com/') {
    	var test = 'test';
		chrome.tabs.executeScript(null, {file: "drought.js"});
    }
});