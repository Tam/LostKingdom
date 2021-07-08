/*---
 description: Clamps the number within the given range
 tags: math,number,min,max,clamp
 ---*/
/**
 * Clamps the number within the given range
 *
 * @param {Number} num - The number to clamp
 * @param {Number} min - The minimum limited value
 * @param {Number} max - The maximum limited value
 * @returns {number} - The clamped number
 */
export default function minmax (num, min, max) {
	return Math.min(Math.max(+num, min), max);
}
