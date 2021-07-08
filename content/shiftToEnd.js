/*---
tags: array
description: Will shift the specified number of items to the end of the array
---*/
/**
 * Will shift the specified number of items to the end of the array
 *
 * @param {Array} array - The array to modify
 * @param {Number} count - The number of items to shift
 * @returns {Array} - The modified array
 */
export default function shiftToEnd (array, count) {
	array = [...array];
	count = count % array.length;

	for (let i = 0; i < count; i++)
		array.push(array[i]);

	array.splice(0, count);

	return array;
}
