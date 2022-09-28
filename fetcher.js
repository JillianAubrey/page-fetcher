const request = require('request');
const fs = require('fs');
const url = process.argv[2];
const path = process.argv[3];

const writeFile = function(path, text) {
  fs.writeFile(path, text, error => {
    if (error) {
      return console.log('file error:', error);
    }
    console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
  });
}

request(url, (error, response, body) => {
  if (error) {
    return console.log('connection error:', error);
  }
  if (response.statusCode !== 200) {
    return console.log(response.statusCode, response.statusMessage);
  }
  // console.log('body:', body);
  fs.access(path, fs.constants.F_OK, (error) => {
    if (!error) { //if there's no error, the file exists
      return console.log(`${path} already exists!`);
    }
    writeFile(path, body);
  })

});
