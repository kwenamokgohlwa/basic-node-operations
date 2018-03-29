const fs = require('fs');

function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch (command) {
    case "echo":
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1));
      break;
    case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      break;
    default:
      commandLibrary.errorHandler(userInputArray[0]);
  }
}

const commandLibrary = {
  "echo": function(userInput) {
    done(userInput);
  },
  "cat": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err)  throw err;
      done(data);
    });
  },

  // Usage: $ head [# of lines] [filename]

  "head": function(userInput) {
    if (isNaN(userInput[0])){
      var n = 10;
      var fileName = userInput[0];
      fs.readFile(fileName, (err, data) => {
        if (err)  throw err;
        var dataArr = data.toString().split("\n");
        var nData = [];
        for(var i = 0; i < n; i++) {
          nData.push(dataArr[i]);
        }
        data = nData.join("\n");
        done(data);
      });
    }else {
      var n = userInput[0];
      var fileName = userInput[1];
      fs.readFile(fileName, (err, data) => {
        if (err)  throw err;
        var dataArr = data.toString().split("\n");
        var nData = [];
        for(var i = 0; i < n; i++) {
          nData.push(dataArr[i]);
        }
        data = nData.join("\n");
        done(data);
      });
    }

  },

  // Usage: $ tail [# of lines] [filename]

  "tail": function(userInput) {
    if (isNaN(userInput[0])) {
      var n = 10;
      var fileName = userInput[0];
      fs.readFile(fileName, (err, data) => {
        if (err)  throw err;
        var dataArr = data.toString().split("\n");
        n = dataArr.length - n;
        var nData = [];
        for(var i = n; i < dataArr.length; i++) {
          nData.push(dataArr[i]);
        }
        data = nData.join("\n");
        done(data);
      });
    }else {
      var n = userInput[0];
      var fileName = userInput[1];
      fs.readFile(fileName, (err, data) => {
        if (err)  throw err;
        var dataArr = data.toString().split("\n");
        n = dataArr.length - n;
        var nData = [];
        for(var i = n; i < dataArr.length; i++) {
          nData.push(dataArr[i]);
        }
        data = nData.join("\n");
        done(data);
      });
    }
  },

  "errorHandler": function(userInput) {
    done("Error: " + userInput + " is not a command");
  }

};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
