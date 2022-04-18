const selected = document.querySelector('#selected');
const options = document.querySelectorAll('.option');
const token = document.querySelector('#token');
const databaseId = document.querySelector('#databaseId');
const link = document.querySelector('#link');


// token
token.addEventListener('change', (event) => {
  chrome.storage.sync.set({'token': event.target.value});

  chrome.storage.sync.get('token', function(result) {
    selected.innerHTML = `token = ` + result['token'];
  });
});

// token
databaseId.addEventListener('change', (event) => {
  chrome.storage.sync.set({'databaseId': event.target.value});

  chrome.storage.sync.get('databaseId', function(result) {
    selected.innerHTML = `databaseId = ` + result['databaseId'];
  });
});

// token
link.addEventListener('change', (event) => {
  chrome.storage.sync.set({'link': event.target.value});

  chrome.storage.sync.get('link', function(result) {
    selected.innerHTML = `link = ` + result['link'];
  });
});



// check boxes
for(let i = 0; i < options.length; i++)
{
  options[i].addEventListener('change', (event) => {
    let key = event.target.name;
    let value = event.target.value;
  
    // stores value based on checkbox status
    // set requires a key/value pair in the form "key": value
    if(event.target.checked)
      chrome.storage.sync.set({ [`${key}`]: value });
    else
      chrome.storage.sync.set({ [`${key}`]: 'disabled' });
    
    UpdateSelected(key);
  });
}

// debug info
function UpdateSelected(key) {
  // gets the value stored
  // get requires a key - which is a string
  chrome.storage.sync.get([key], function(result) {
    selected.innerHTML = `${key} = ` + result[`${key}`];
  });
}