/**
 * Randomly shuffles the given array
 *
 * @param {array} array
 * @returns {array}
 */
export default function shuffle (array) {
	return array.sort(() => Math.random() - 0.5);
}
