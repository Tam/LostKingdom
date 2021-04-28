/*---
description: A pause-able interval timer
---*/
/**
 * A pause-able interval timer
 * via: https://stackoverflow.com/a/24725066/550109
 *
 * ```js
 * const timer = new IntervalTimer(function () {
 *     alert("Done!");
 * }, 5000);
 *
 * timer.pause();
 * timer.resume();
 * timer.restart();
 * ```
 *
 * @param {Function} callback
 * @param {number} interval
 * @constructor
 */
export default function IntervalTimer (callback, interval) {
	let timerId, startTime, remaining = 0;
	let state = 0; //  0 = idle, 1 = running, 2 = paused, 3 = resumed

	this.pause = function () {
		if (state !== 1) return;

		remaining = interval - (new Date() - startTime);
		window.clearInterval(timerId);
		state = 2;
	};

	this.resume = function () {
		if (state !== 2) return;

		state = 3;
		window.setTimeout(this.timeoutCallback, remaining);
	};

	this.restart = function () {
		startTime = new Date();
		timerId = window.setInterval(callback, interval);
		state = 1;
	};

	this.timeoutCallback = function () {
		if (state !== 3) return;

		callback();

		startTime = new Date();
		timerId = window.setInterval(callback, interval);
		state = 1;
	};

	this.restart();
}
