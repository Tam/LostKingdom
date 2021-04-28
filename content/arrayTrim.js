/*---
tags: array
description: Will trim all falsy values from the end of an array
---*/
/**
 * Will trim all falsy values from the end of an array
 *
 * @param {Array} a
 * @return {Array}
 */
export default function trim (a) {
	a = [...a].reverse();

	while (a.length) {
		if (a[0]) break;
		a.shift();
	}

	return a.reverse();
}
