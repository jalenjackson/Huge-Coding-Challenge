const canvasHelper = require('../canvasHelper');
let horizontalCalledFirst = false;
let verticalCalledFirst = false;
let previousX1 = null;
let previousY1 = null;
let previousX2 = null;
let previousY2 = null;

module.exports = function drawXYLine() {
  try {
    const commands = canvasHelper.findCommand('L');

    commands.map((command) => {
      const [x1, y1, x2, y2] = command.substring(2).replace(/\s/g, "").split('');

      if (y1 === y2) handleHorizontal.bind(this)(x1, y1, x2, y2, false);
      if (x1 === x2) handleVertical.bind(this)(x1, y1, x2, y2, false);
    });

    function handleHorizontal(x1, y1, x2, y2, afterHorizontal) {
      if (!afterHorizontal) canvasHelper.drawWidth(this.width);

      if (verticalCalledFirst) handleVertical.bind(this)(previousX1, previousY1, previousX2, previousY2, true);

      canvasHelper.drawHeight(this.width, y1 - 1);
      canvasHelper.drawHorizontalXs(x1, x2, this.width);

      if (afterHorizontal) return;

      canvasHelper.drawHeight(this.width, (this.height) - y1);
      canvasHelper.drawWidth(this.width);

      if (!verticalCalledFirst) horizontalCalledFirst = true;
      previousX1 = x1;
      previousY1 = y1;
      previousX2 = x2;
      previousY2 = y2;
    }

    function handleVertical(x1, y1, x2, y2, afterVertical) {
      if (!afterVertical) canvasHelper.drawWidth(this.width);

      if (horizontalCalledFirst) handleHorizontal.bind(this)(previousX1, previousY1, previousX2, previousY2, true);

      canvasHelper.drawHeight(this.width, y1 - 3);
      canvasHelper.drawVerticalXs(x1, x2, y1, y2, this.width);

      if (!afterVertical) canvasHelper.drawWidth(this.width);

      if (!horizontalCalledFirst) verticalCalledFirst = true;
      previousX1 = x1;
      previousY1 = y1;
      previousX2 = x2;
      previousY2 = y2;
    }

  } catch (e) {
    canvasHelper.throwErrorMessage(canvasHelper.messages.unexpectedError, e)
  }
};
