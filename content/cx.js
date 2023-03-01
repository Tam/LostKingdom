/*---
tags: class
description: Builds a class string from the given args but smaller
---*/
/**
 * Builds a class string from the given args but smaller
 *
 * cx('my-class', a === b && css.myClass, css.hi)
 *
 * @param args
 * @return {string}
 */
export default function cx (...args) {
	return args.filter(Boolean).join(' ');
}
