function randomRgbValue() {
    return Math.floor(255 * Math.random());
}

function randomColor() {
    var rgb = [randomRgbValue(), randomRgbValue(), randomRgbValue()];
    return 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')';
}

module.exports = function () {
    var Bubble = function (canvasCtx, radius) {
        this.canvasCtx = canvasCtx;
        this.destroy = false;
        this.color = randomColor();
        this.radius = radius;
        this.position = {
            x: this.canvasCtx.canvas.width / 2 * Math.random(),
            y: this.canvasCtx.canvas.height / 2 * Math.random()
        };
        this.lifeTime = 0;
    };

    Bubble.prototype.draw = function () {
        this.canvasCtx.beginPath();
        this.canvasCtx.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0,
            2 * Math.PI,
            false
        );
        this.canvasCtx.fillStyle = this.color;
        this.canvasCtx.fill();
    };

    Bubble.prototype.update = function () {
        if (this.lifeTime > 48) {
            this.destroy = true;
        }
        this.lifeTime++;
    };

    return Bubble;
};