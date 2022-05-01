class Logger {
	constructor(context) {
		this.enabled = true;
		this.context = context;
	}

	enable() {
		this.enabled = true;
	}

	disable() {
		this.enabled = false;
	}

	info(...message) {
		this.enabled && console.log(`${this.context} >`, ...message);
	}

	error(...message) {
		this.enabled && console.error(`${this.context} >`, ...message);
	}

	critical(...message) {
		this.enabled &&
			console.error(`${this.context} > CRITICAL ERROR >`, ...message);
	}
}

module.exports = Logger;