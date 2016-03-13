module.exports = function () {
	var Synth = function (shape, pitch, volume, positionX, audioCtx) {
		this.panner = audioCtx.createPanner();
		this.panner.setPosition(positionX,0,1);
		this.audioCtx = audioCtx;
		this.osc  = audioCtx.createOscillator();
		this.gain = audioCtx.createGain();

		this.osc.type = shape;

		this.pitch  = this.osc.frequency;
		this.volume = this.gain.gain;
		this.pitch.value = pitch;
		this.volume.value = volume;

		this.osc.connect(this.gain);
		this.gain.connect(this.panner);
		this.panner.connect(this.audioCtx.destination);
	};

	Synth.prototype.start = function () {
		this.osc.start();
	};

	Synth.prototype.stop = function () {
		this.osc.stop();
	};

	Synth.prototype.setPositionX = function (x) {
		this.panner.setPosition(x, 0, 1);
	};

	return Synth;
};