function randomRgbValue() {
    return Math.floor(255 * Math.random());
}

function randomColor() {
    var rgb = [randomRgbValue(), randomRgbValue(), randomRgbValue()];
    return 'rgba(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ', 0.5)';
}

module.exports = function () {
    var Bubble = function (canvasCtx, audioCtx) {
        this.canvasCtx = canvasCtx;
        this.audioCtx = audioCtx;
        this.osc = audioCtx.createOscillator();
        this.gain = audioCtx.createGain();
        this.osc.frequency.value = 440 + (220 * Math.random());
        this.alive = true;
        this.color = randomColor();
        this.radius = 1;
        this.position = {
            x: this.canvasCtx.canvas.width * Math.random(),
            y: this.canvasCtx.canvas.height * Math.random()
        };
        this.lifeTime = 0;
        this.gain.gain.value = 0;
        startSound(audioCtx, this.osc, this.gain);
    };

    function startSound(audioCtx, osc, gain) {
        var oscShapes = ['square', 'sine', 'sawtooth'];
        osc.type = oscShapes[Math.floor(Math.random() * 3)];
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
    }

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
        if (this.lifeTime > 30 + (30 * Math.random())) {
            this.alive = false;
            this.gain.gain.value = 0;
            setTimeout(function () {
                this.osc.stop();
            }.bind(this), 100);
        }
        this.gain.gain.value += 0.005;
        this.radius++;
        this.lifeTime++;
    };

    return Bubble;
};