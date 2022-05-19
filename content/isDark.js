/*---
description: Detects if the given hex is dark
tags: color,colour,lightness,darkness,brightness,luma
---*/
/**
 * Detects if the given hex is dark
 *
 * isDark('#262629') -> true
 * isDark(0xfff) -> false
 * isDark('000', 20) -> false
 *
 * @param {string|number} color - The colour to test (Supports 3 & 6 length hexes, with or without a hash)
 * @param {number} threshold - The luma value, below which is considered dark (0-255)
 * @returns {boolean}
 * @see {@link https://stackoverflow.com/a/12043228/550109} for original source
 */
export default function isDark (color, threshold = 40) {
	const c = typeof color === 'string' ? color.replace('#', '') : color;
	const rgb = parseInt(c, 16); // convert rrggbb to decimal
	const r = (rgb >> 16) & 0xff       // extract red
		, g = (rgb >>  8) & 0xff       // extract green
		, b = (rgb >>  0) & 0xff;      // extract blue

	const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

	return luma < threshold;
}
