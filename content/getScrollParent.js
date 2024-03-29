/*---
description: Will get the nearest scrollable parent
---*/
/**
 * Will get the nearest scrollable parent
 *
 * @param {HTMLElement} element
 * @param {Boolean?} includeHidden
 * @returns {HTMLElement}
 */
export default function getScrollParent (element, includeHidden = false) {
	let style = getComputedStyle(element);
	const excludeStaticParent = style.position === 'absolute';
	const overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;

	if (style.position === 'fixed')
		return document.documentElement;

	for (let parent = element; (parent = parent.parentElement);) {
		style = getComputedStyle(parent);

		if (excludeStaticParent && style.position === 'static')
			continue;

		if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX))
			return parent;
	}

	return document.documentElement;
}
