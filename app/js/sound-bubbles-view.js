var _ = require('lodash');
var Bubble = require('./bubble')();

module.exports = function () {
    var SoundBubblesView = function (canvasCtx, width, height, posX, posY) {
        this.canvasCtx = canvasCtx;
        this.width  = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
        this.bubbles = [new Bubble(this)];
    };

    SoundBubblesView.prototype.draw = function () {
        // draw background
        this.canvasCtx.fillStyle = "gray";
        this.canvasCtx.fillRect(
            this.posX,
            this.posY,
            this.width,
            this.height
        );

        // draw any existing bubbles
        _.each(this.bubbles, function (bubble) {
            bubble.draw();
        });
    };

    SoundBubblesView.prototype.update = function () {
        var newBubbles = [];
        // iterate through bubbles
           // tell bubble "update thyself"
           // if bubble replies "i'm dead now", remove it
        _.each(this.bubbles, function (bubble) {
            bubble.update();
            if (!bubble.destroyed) {
                newBubbles.push(bubble);
            }
        });
        // decide whether to create a new bubble
        if (false) {
            newBubbles.push(new Bubble(this));
        }
        this.bubbles = newBubbles;
    };

    return SoundBubblesView;
};
