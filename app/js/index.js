const CANVAS_CONTEXT = document.getElementById('canvas').getContext('2d'),
      BACKGROUND_COLOR = "#f2f2f2";

var SoundBubblesView = require('./sound-bubbles-view')();
var soundBubblesView = new SoundBubblesView(CANVAS_CONTEXT, BACKGROUND_COLOR);

function animate() {
    soundBubblesView.draw();
    soundBubblesView.update();
	requestAnimationFrame(animate);
}

animate();