

//the following function must run every 30 minutes, when refreshed, and when first loaded 
function getFile(){
  console.log('Get file function called');
}

chrome.webNavigation.onCommitted.addListener((details) => {
  if(["reload", "link", "typed", "generated"].includes(details.transitionType) && details.url.includes("https://ufl.instructure.com")) {
    console.log('webNav');

    // chrome.storage.sync.get('token', function(result) {
    //   token.value = result['token'];
    // });
    // getFile();
  }
});

setInterval(getFile, 1800000); //1800000 -> 30 minutes

let startDate = new Date();
let elapsedTime = 0;

const focus = function(){
  startDate = new Date();
}

//console.log(details.url.includes("https://ufl.instructure.com"))