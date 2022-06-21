/*---
description: Converts the given number of days to a human-readable string (or object)
tags: date,days,format
---*/
const p = (v, w) => `${v} ${w}${v !== 1 ? 's' : ''}`;

/**
 * Converts the given number of days to a human-readable string (or object)
 *
 * @param {number} days
 * @param {boolean=false} asObject
 * @returns {string|{days: number, weeks: number, months: number, years: number}}
 */
export default function daysToString (days, asObject = false) {
	const years = (days / 365)|0;
	days -= 365 * years;

	const months = (days / 30)|0;
	days -= 30 * months;

	const weeks = (days / 7)|0;
	days -= 7 * weeks;

	if (asObject)
		return { days, weeks, months, years };

	let s = '';

	if (years) s += p(years, 'year') + ', ';
	if (months) s += p(months, 'month') + ', ';
	if (weeks) s += p(weeks, 'week') + ', ';
	if (days) s += p(days, 'day');

	return s.replace(/, $/, '');
}
