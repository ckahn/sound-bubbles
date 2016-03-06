const FPS = 48,
      CANVAS_CONTEXT = document.getElementById('canvas').getContext('2d');

var SoundBubblesView = require('./sound-bubbles-view')();

var soundBubblesView = new SoundBubblesView(
    CANVAS_CONTEXT,
    CANVAS_CONTEXT.canvas.width,
    CANVAS_CONTEXT.canvas.height,
    0,
    0
);

soundBubblesView.draw();
setInterval(function () {
    soundBubblesView.update();
    soundBubblesView.draw();
}, 1000/FPS);