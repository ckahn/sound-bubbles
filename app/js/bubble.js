var Synth = require('./synth')();

function randomColor() {
    var rgb = [randomRgbValue(), randomRgbValue(), randomRgbValue()];
    return 'rgba(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ', 0.5)';
}

function randomRgbValue() {
    return Math.floor(255 * Math.random());
}

function waveform() {
    var shapes = ['square', 'sine', 'sawtooth', 'triangle'],
        idx = Math.floor(Math.random() * shapes.length);
    return shapes[idx];
}

function pitch(percent) {
    var notes = [110.00, 130.81, 146.83, 164.81, 196.00, 220.00, 261.63, 293.66, 329.63, 392.00, 440.00],
        idx = (notes.length - 1) - (Math.floor(percent * (notes.length - 1)));
    return notes[idx] + (Math.random() * 0.3);
}

module.exports = function () {
    var Bubble = function (canvasCtx, audioCtx) {
        this.canvasCtx = canvasCtx;
        this.audioCtx = audioCtx;
        this.alive = true;
        this.color = randomColor();
        this.radius = 0;
        this.position = {
            x: this.canvasCtx.canvas.width * Math.random(),
            y: this.canvasCtx.canvas.height * Math.random()
        };
        this.birthTime = Date.now();
        this.lifePeak = 10 + 500 * Math.random();
        this.maxRadius = 100;
        this.maxGain = 0.1;
        this.lifeSpan = this.lifePeak + (500 * Math.random());
        this.synth = new Synth(
            waveform(),
            pitch(this.position.y/this.canvasCtx.canvas.height),
            0,
            (this.position.x - this.canvasCtx.canvas.width/2) * 0.008,
            audioCtx
        );
        this.synth.start();
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
        var age = Date.now() - this.birthTime;
        var percentToPeak = age / this.lifePeak;
        var percentPeakToEnd =
            (age - this.lifePeak) / (this.lifeSpan - this.lifePeak);

        if (age > this.lifeSpan) {
            this.alive = false;
            this.synth.stop();
        }
        else if (age < this.lifePeak) {
            this.radius = this.maxRadius * percentToPeak;
            this.synth.volume.value = this.maxGain * percentToPeak;
        } else {
            this.radius = (1 - percentPeakToEnd) * this.maxRadius;
            this.synth.volume.value = (1 - percentPeakToEnd) * this.maxGain;
        }
    };

    return Bubble;
};