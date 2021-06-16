/*---
tags: date
description: Calculates the number of days between two dates
 ---*/
/**
 * Calculates the number of days between two dates
 *
 * @param {Date} from
 * @param {Date} to
 * @returns {number}
 */
export default function daysInRange (from, to) {
	return Math.round(Math.abs(from - to) / 8.64e+7);
}
