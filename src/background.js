let color = '#3aa757'; //we can change the color later

chrome.runtime.onInstalled.addListener(() => {
  //GET FILE HERE
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

//the following function must run every 30 minutes, when refreshed, and when first loaded 
function getFile(){
  console.log('Get file function called');
}

chrome.webNavigation.onCommitted.addListener((details) =>
{
  if (["reload", "link", "typed", "generated"].includes(details.transitionType) &&
        (details.url.includes("https://ufl.instructure.com"))) {
          console.log('webNav');
          getFile();

       /* chrome.webNavigation.onCompleted.addListener(function onComplete() {
            codeAfterReloadAndFinishSomeLoading();
            chrome.webNavigation.onCompleted.removeListener(onComplete);
        });*/
    }
});

setInterval(getFile, 1800000); //1800000 -> 30 minutes

let startDate = new Date();
let elapsedTime = 0;

const focus = function(){
  startDate = new Date();
}

//console.log(details.url.includes("https://ufl.instructure.com"))