/*---
tags: string
description: Decode / Unescape HTML entities
---*/
/**
 * Decode / Unescape HTML entities
 *
 * @param str
 * @returns {*}
 */
export default function unescape (str) {
	return str.replace(/&[^;]+;/gm, m => ({
		'&quot;': '"',
		'&#34;': '"',

		'&apos;': '\'',
		'&#39;': '\'',

		'&amp;': '&',
		'&#38;': '&',

		'&gt;': '>',
		'&#62;': '>',

		'&lt;': '<',
		'&#60;': '<',

		'&cent;': '¢',
		'&#162;': '¢',

		'&copy;': '©',
		'&#169;': '©',

		'&euro;': '€',
		'&#8364;': '€',

		'&pound;': '£',
		'&#163;': '£',

		'&reg;': '®',
		'&#174;': '®',

		'&yen;': '¥',
		'&#165;': '¥',
	}[m.replace(/#(0+)/gm, '#')]));
}
