/*---
tags: string
description: Converts the given string to kebab-case
---*/
/**
 * Converts the given string to kebab-case
 */
export default function kebab (str) {
	if (str === str.toUpperCase()) str = str.toLowerCase();
	
	return str
		.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
		.map(x => x.toLowerCase())
		.join('-');
}
