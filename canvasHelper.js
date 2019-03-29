const fs = require('fs');

module.exports = {
  messages: {
    unexpectedError: 'An unexpected error occurred initializing the canvas! Exiting process...',
    drawingCanvas: 'Drawing Canvas...',
    canvasInit: 'Canvas Initialized...',
    noCanvas: 'You did not specify dimensions for your canvas. Example. L 1 2 6 2. Exiting...',
    outputFile: 'output2.txt',
    inputFile: 'input.txt',
    errorColor: '\x1b[31m%s\x1b[0m',
    successColor: '\x1b[35m%s\x1b[0m'
  },
  throwErrorMessage: function(message) {
    throw new Error(message);
  },
  warningMessage(message) {
    console.error(this.messages.errorColor, message);
  },
  startWriteFileStream() {
    return fs.createWriteStream(this.messages.outputFile);
  },
  findCommand(command) {
    let txtFileLines = fs.readFileSync(this.messages.inputFile, 'utf-8')
      .split('\n')
      .filter(Boolean);

    return txtFileLines.reduce(function(result, line) {
      if (line[0] === command) result.push(line);
      return result;
    }, []);
  },
  appendToFile(message) {
    return fs.appendFileSync(this.messages.outputFile, message);
  },
  drawHeight(width, height) {
    for (let i = 0; i < height; i++) {
      this.appendToFile(`|${' '.repeat(width - 2)}|\n`)
    }
  },
  drawWidth(width) {
    return this.appendToFile(`${'-'.repeat(+width)}\n`)
  },
  drawHorizontalXs(x1, x2, width) {
    this.appendToFile(`|${ ' '.repeat(x1 - 1) }${ 'x'.repeat(x2) }${ ' '.repeat(width - x2 - 2) }|\n`);
  },
  drawVerticalXs(x1, x2, y1, y2, width) {
    for (let i = 0; i <= (y2 - y1); i++) {
      this.appendToFile(`|${ ' '.repeat(x1 - 1) }x${ ' '.repeat(width - x2 - 2) }|\n`);
    }
  }
};