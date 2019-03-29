var fs = require('fs');

module.exports = function drawRectangle(width, height) {
  function createCopyOfLast() {
    fs.readFile('output2.txt', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }

      let heightTraversed = 0;
      let horizontalSpacesCrossed = 0;

      let lastData = data.substring(data.length - width * 6.3);

      for (let i = 0; i < lastData.length; i++) {
        if (lastData[i] === '|') {
          heightTraversed++;
        }

        if (heightTraversed === 1) {
          horizontalSpacesCrossed++;

          if (horizontalSpacesCrossed === 16 - 1) {
            lastData = setCharAt(lastData, i, `${ 'x'.repeat(20 - 16 + 1) }`);

            console.log(lastData[i + (width - 16) + 1])
            lastData = setCharAt(lastData, i + (width - 16) + 1, '');
            console.log(lastData);
          }
        }
      }

      console.log(lastData);
    });
  }

  createCopyOfLast();
};

function setCharAt(str,index,chr) {
  if(index > str.length-1) return str;
  return str.substr(0,index) + chr + str.substr(index+1);
}