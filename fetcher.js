const request = require('request');
const fs = require('fs');
const url = process.argv[2];
const path = process.argv[3];

request(url, (error, response, body) => {
  if (error) {
    return console.log('connection error:', error);
  }
  console.log('statusCode:', response && response.statusCode);
  // console.log('body:', body);
  fs.writeFile(path, body, error => {
      if (error) {
        return console.log('file error:', error);
      }
      console.log('File created');
    })
});
