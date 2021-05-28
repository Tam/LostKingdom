/*---
tags: form
description: Converts the given FormData to a JSON String
---*/
/**
 * Converts the given FormData to a JSON String
 *
 * @param {FormData} formData
 * @returns {string}
 */
export default function formDataToJson (formData) {
	const object = {};

	formData.forEach((value, key) => {
		if(!Reflect.has(object, key)){
			object[key] = value;
			return;
		}

		if(!Array.isArray(object[key]))
			object[key] = [object[key]];

		object[key].push(value);
	});

	return JSON.stringify(object);
}
