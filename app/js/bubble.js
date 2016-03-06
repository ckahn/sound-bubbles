module.exports = function () {
    var Bubble = function (soundBubblesView) {
        this.view = soundBubblesView;
        this.destroyed = false;
        this.radius = 20;
        this.position = {
            x: 10,
            y: 10
        };
    };

    Bubble.prototype.draw = function () {
        this.view.canvasCtx.beginPath();
        this.view.canvasCtx.arc(
            this.view.width / 2,
            this.view.height / 2,
            this.radius,
            0,
            Math.PI+(Math.PI*10)/2,
            false
        );
        this.view.canvasCtx.fillStyle = 'green';
        this.view.canvasCtx.fill();
        this.view.canvasCtx.lineWidth = 5;
        this.view.canvasCtx.strokeStyle = '#003300';
        this.view.canvasCtx.stroke();
    };

    Bubble.prototype.update = function () {
        this.destroyed = true;
    };

    return Bubble;
};