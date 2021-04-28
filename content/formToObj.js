/*---
description: Converts the given form elements to an object
---*/
/**
 * Checks if the given element has a valid name and value, and isn't disabled
 *
 * @param {Element|HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} element
 * @return {Boolean}
 */
function isValidElement (element) {
	let parent = element.parentNode;

	while (parent && parent.nodeName.toLowerCase() !== 'form') {
		if (parent.nodeName.toLowerCase() === 'fieldset' && parent.disabled)
			return false;

		parent = parent.parentNode;
	}

	return element.name && element.value && !element.disabled;
}

/**
 * Checks if the given elements value can be saved
 * (i.e. not an unchecked checkbox)
 *
 * @param {Element|HTMLInputElement} element
 * @return {Boolean}
 */
function isValidValue (element) {
	return (!['checkbox', 'radio'].includes(element.type) || element.checked);
}

/**
 * Checks if the given element is a checkbox
 *
 * @param {Element|HTMLInputElement} element
 * @return {Boolean}
 */
function isCheckbox (element) {
	return element.type === 'checkbox';
}

/**
 * Checks if the given element is a select w/ the multiple attribute
 *
 * @param {Element|HTMLSelectElement} element
 * @return {Boolean}
 */
function isMultiSelect (element) {
	return element.options && element.multiple;
}

/**
 * Gets the selected values from the given multi-select element
 *
 * @param {HTMLOptionsCollection} element
 * @return {Array}
 */
function getSelectValues (element) {
	return [].reduce.call(element, (values, option) => {
		return option.selected ? values.concat(option.value) : values;
	}, []);
}

/**
 * Converts the given form elements to an object
 *
 * @param {HTMLFormControlsCollection} elements
 *
 * @return {Object}
 */
export default function formToObj (elements) {
	return [].reduce.call(elements, (data, element) => {
		if (!isValidElement(element) || !isValidValue(element))
			return data;

		if (isCheckbox(element))
			data[element.name] = (data[element.name] || []).concat(element.value);
		else if (isMultiSelect(element))
			data[element.name] = getSelectValues(element);
		else
			data[element.name] = element.value;

		return data;
	}, {});
}
