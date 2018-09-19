

chrome.browserAction.onClicked.addListener(buttonClicked); // Listen for the browserAction then run the buttonClicked function

function buttonClicked() {
  chrome.tabs.create({active: true}); // Open a new tab and make it the active page
}
