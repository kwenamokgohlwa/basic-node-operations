var input = "I'm learning to program algorithms!";

function reverseString(inputString) {
  var inputArr = inputString.split(' ');
  var outputArr = [];

  inputArr.forEach((word) => {
    var wordArr = word.split('');
    wordArr.reverse();
    word = wordArr.join('');
    outputArr.push(word);
  });

  outputString = outputArr.join(' ');
  return outputString;
}

console.log(reverseString(input));
