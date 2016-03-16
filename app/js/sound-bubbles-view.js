var _ = require('lodash');
var Bubble = require('./bubble')();

module.exports = function () {
    var SoundBubblesView = function (canvasCtx, audioCtx, backgroundColor) {
        this.canvasCtx = canvasCtx;
        this.audioCtx  = audioCtx;
        this.backgroundColor = backgroundColor;
        this.bubbleCreationRate = 0.2;
        this.bubbles = [];
    };

    function createSound(audioCtx) {
        var osc  = audioCtx.createOscillator(),
            gain = audioCtx.createGain();

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
    }

    SoundBubblesView.prototype.draw = function () {
        this.canvasCtx.fillStyle = this.backgroundColor;
        this.canvasCtx.fillRect(
            0,
            0,
            this.canvasCtx.canvas.width,
            this.canvasCtx.canvas.height
        );

        _.each(this.bubbles, function (bubble) {
            bubble.draw();
        });
    };

    SoundBubblesView.prototype.update = function () {
        var newBubbles = [];
        _.each(this.bubbles, function (bubble) {
            bubble.update();
            if (bubble.alive) {
                newBubbles.push(bubble);
            }
        });
        if (Math.random() < this.bubbleCreationRate) {
            newBubbles.push(new Bubble(this.canvasCtx, this.audioCtx));
        }
        this.bubbles = newBubbles;
    };

    return SoundBubblesView;
};
