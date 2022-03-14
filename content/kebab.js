/*---
tags: string
description: Converts the given string to kebab-case
---*/
/**
 * Converts the given string to kebab-case
 */
export default function kebab (str) {
	if (str === str.toUpperCase()) str = str.toLowerCase();
	
	return str.replace(
		/[\sA-Z\u00C0-\u00D6\u00D8-\u00DE]/g,
		match => '-' + match.toLowerCase().replace(' ', '')
	)
		.replace(/[^a-zA-Z\d-]/g, '')
		.replace(/^-/, '')
		.replace(/-+/g, '-');
}
