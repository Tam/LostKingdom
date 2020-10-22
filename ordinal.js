/**
 * Will take a given number and append the appropriate ordinal
 *
 * ordinal(20) => 20th
 * ordinal(21) => 21st
 * ordinal(22) => 22nd
 * ordinal(23) => 23rd
 * 
 * @param {number} n
 * @return {string}
 * @see https://stackoverflow.com/a/44418732/550109
 */
export default function ordinal (n) {
	return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}
