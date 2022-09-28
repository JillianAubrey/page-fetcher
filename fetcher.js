const request = require('request');
const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const url = process.argv[2];
const path = process.argv[3];


const writeFile = function(path, text) {
  fs.writeFile(path, text, error => {
    if (error) {
      return console.log('file error:', error);
    }
    console.log(`Downloaded and saved ${text.length} bytes to ${path}`);
  });
};

request(url, (error, response, body) => {
  if (error) {
    return console.log('connection error:', error);
  }
  if (response.statusCode !== 200) {
    return console.log(response.statusCode, response.statusMessage);
  }

  fs.access(path, fs.constants.F_OK, (fileDoesntExist) => {
    if (fileDoesntExist) {
      rl.close();
      return writeFile(path, body);
    }
    console.log(`${path} already exists!`);
    rl.question('Would you like to overwrite it? (Y/N) ', answer => {
      if (answer.toLowerCase() !== 'y') {
        console.log(`${path} was not overwritten.`);
        rl.close();
        return;
      }
      writeFile(path, body);
      rl.close();
    });
  });
});