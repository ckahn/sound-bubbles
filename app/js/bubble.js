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
        this.osc.frequency.value = [440, 493.883, 587.330, 523.251, 659.255, 783.991, 110][Math.floor(Math.random() * 7)];
        this.alive = true;
        this.color = randomColor();
        this.radius = 1;
        this.position = {
            x: this.canvasCtx.canvas.width * Math.random(),
            y: this.canvasCtx.canvas.height * Math.random()
        };
        this.birthTime = Date.now();
        this.gain.gain.value = 0;
        this.lifePeak = 25 + (25 * Math.random());
        this.maxRadius = 100;
        this.maxGain = 1;
        this.lifeSpan = this.lifePeak + 500 + (500 * Math.random());
        startSound(audioCtx, this.osc, this.gain);
    };

    function startSound(audioCtx, osc, gain) {
        var oscShapes = ['square', 'sine', 'sawtooth', 'triangle'];
        osc.type = oscShapes[Math.floor(Math.random() * 4)];
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
        var age = Date.now() - this.birthTime;
        var percentToPeak = age / this.lifePeak;
        var percentPeakToEnd =
            (age - this.lifePeak) / (this.lifeSpan - this.lifePeak);

        if (age > this.lifeSpan) {
            this.alive = false;
            this.osc.stop();
        }
        else if (age < this.lifePeak) {
            this.radius = this.maxRadius * percentToPeak;
            this.gain.gain.value = this.maxGain * percentToPeak;
        } else {
            this.radius = (1 - percentPeakToEnd) * this.maxRadius;
            this.gain.gain.value = (1 - percentPeakToEnd) * this.maxGain;
        }
    };

    return Bubble;
};