const initializeCanvas = require('./methods/initializeCanvas');
const drawXYLine = require('./methods/drawXYLine');
const drawRectangle = require('./methods/drawRectangle');
const canvasHelper = require('./canvasHelper');

class Canvas {
  constructor() {
    this.canvasInitialized = false;
    this.width = null;
    this.height = null;

    initializeCanvas.bind(this)();

    if (this.canvasInitialized) {
      drawXYLine.bind(this)();
      drawRectangle.bind(this)(this.width, this.height);
    }
  }
}

let canvas = new Canvas();
