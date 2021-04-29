/*---
tags: string
description: Converts the given string to camelCase
---*/
/**
 * Converts the given string to camelCase
 *
 * @param str
 * @returns {*}
 */
export default function camel (str) {
	return str.toLowerCase().replace(
		/[^a-zA-ZÀ-ÖØ-öø-ÿ0-9]+(.)/g,
		(m, chr) => chr.toUpperCase()
	);
}
