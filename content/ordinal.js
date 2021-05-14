/**
 * Will take a given number and append the appropriate ordinal
 *
 * ordinal(20) => 20th
 * ordinal(21) => 21st
 * ordinal(22) => 22nd
 * ordinal(23) => 23rd
 * ordinal('March 15 2020') => March 15th 2020
 *
 * @param {number|string} n
 * @return {string}
 */
export default function ordinal (n) {
	if (typeof n === 'string')
		return n.replaceAll(/\b(\d{1,2})\b/gm, (_, b) => ordinal(+b));

	return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}
