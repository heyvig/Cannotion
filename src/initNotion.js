const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Notion-Version': '2022-02-22',
      'Content-Type': 'application/json',
      Authorization: 'Bearer secret_EuaqGyOIWlphmYIjS3gW9d8uUuud6VAOzZriQYkhEZE'
    },
    body: JSON.stringify({parent: 'ce1292e3445e420d948a1f1b242c1d87', properties: 'aaa'})
  };
  
  fetch('https://api.notion.com/v1/databases', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));