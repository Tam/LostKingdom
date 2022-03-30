/*---
tags: array,collection,object,find
description: Cherry-picks from the given array of objects, comparing top-level keys against the given compare object.
---*/
/**
 * Cherry-picks from the given array of objects, comparing top-level keys
 * against the given compare object.
 *
 * ```js
 * const myCollection = [
 *   { id: 1, default: false },
 *   { id: 2, default: true },
 *   { id: 3, default: false },
 * ];
 *
 * const defaultValue = cherryPick(myCollection, { default: true });
 * ```
 *
 * @param {[...Object]} array - Collection to pick from
 * @param {Object} compare - An object of values to compare against
 * @param {Boolean=true} fallbackToFirst - Whether to fall back to the first value if no match is found
 * @returns {?Object} The picked object if available
 */
export default function cherryPick (array, compare, fallbackToFirst = true) {
	const entries = Object.entries(compare);

	outer:
	for (let i = 0, l = array.length; i < l; i++) {
		const item = array[i];

		for (let j = 0, k = entries.length; j < k; j++) {
			const [key, value] = entries[j];

			if (item[key] !== value)
				continue outer;
		}

		return item;
	}

	return fallbackToFirst ? array?.[0] : null;
}
