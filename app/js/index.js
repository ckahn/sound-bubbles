const CANVAS_CONTEXT = document.getElementById('canvas').getContext('2d'),
      AUDIO_CONTEXT  = new (window.AudioContext || window.webkitAudioContext)(),
      WIDTH  = window.innerWidth,
      HEIGHT = window.innerHeight,
      BACKGROUND_COLOR = "#f2f2f2";

var canvas = document.getElementById('canvas');
canvas.width  = WIDTH;
canvas.height = HEIGHT;

var SoundBubblesView = require('./sound-bubbles-view')();
var soundBubblesView = new SoundBubblesView(
	CANVAS_CONTEXT,
	AUDIO_CONTEXT,
	BACKGROUND_COLOR
);

function animate() {
    soundBubblesView.draw();
    soundBubblesView.update();
	requestAnimationFrame(animate);
}

animate();

$('#canvas').mousemove(function (e) {
	var percentFromBottom = 1 - (e.clientY / HEIGHT);
	soundBubblesView.bubbleCreationRate = percentFromBottom;
});