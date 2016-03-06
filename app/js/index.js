const FPS = 48,
      CANVAS_CONTEXT = document.getElementById('canvas').getContext('2d'),
      BACKGROUND_COLOR = "#f2f2f2";

var SoundBubblesView = require('./sound-bubbles-view')();
var soundBubblesView = new SoundBubblesView(CANVAS_CONTEXT, BACKGROUND_COLOR);

setInterval(function () {
    soundBubblesView.draw();
    soundBubblesView.update();
}, 1000/FPS);