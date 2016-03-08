var _ = require('lodash');
var Bubble = require('./bubble')();

module.exports = function () {
    var SoundBubblesView = function (canvasCtx, backgroundColor) {
        this.canvasCtx = canvasCtx;
        this.backgroundColor = backgroundColor;
        this.bubbles = [];
    };

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
        if (this.bubbles.length === 0) {
            newBubbles.push(new Bubble(this.canvasCtx));
        }
        this.bubbles = newBubbles;
    };

    return SoundBubblesView;
};
