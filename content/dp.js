/*---
description: Sets the number of decimal places, stripping trailing zeros to nearest 10
tags: number,format
---*/
/**
 * Sets the number of decimal places, stripping trailing zeros to nearest 10
 *
 * dp(1.4, 2) -> 1.40
 * dp(1.303, 2) -> 1.30
 * dp(10, 2) -> 10
 *
 * @param {number} v - The value to modify
 * @param {number=} d - The number of decimal places
 * @returns {string}
 */
const dp = (v, d = 2) => isNaN(+v) ? v :
	(+v).toFixed(d).replace(
		/(\.0+$)|(?<k>\.\d\d[1-9]?)(0+)$/,
		(_, __, $2) => $2 ?? ''
	);

export default dp;
