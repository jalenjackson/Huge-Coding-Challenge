const canvasHelper = require('../canvasHelper');

function initializeCanvas() {
  console.log(canvasHelper.messages.successColor, canvasHelper.messages.drawingCanvas);

  try {
    const command = canvasHelper.findCommand('C')[0];

    if (command !== null) {
      const dimensions = command.substring(2).split(' ');
      const [width, height] = dimensions;

      canvasHelper.drawWidth(+width);
      canvasHelper.drawHeight(+width, +height);
      canvasHelper.drawWidth(+width);

      this.canvasInitialized = true;
      this.width = +width;
      this.height = +height;
      console.log(canvasHelper.messages.successColor, canvasHelper.messages.canvasInit);
    } else {
      canvasHelper.warningMessage(canvasHelper.messages.noCanvas)
    }
  } catch (e) {
    canvasHelper.throwErrorMessage(`${ canvasHelper.messages.unexpectedError}: ${ e }`);
  }
}

module.exports = initializeCanvas;