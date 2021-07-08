/*---
tags: array,random,shuffle,mix
description: Randomly shuffles the given array using Durstenfeld
---*/
/**
 * Randomly shuffles the given array using Durstenfeld
 *
 * @param {array} array
 * @returns {array}
 */
export default function shuffle (array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	
	return array;
}
