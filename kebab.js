/**
 * Converts the given string to kebab-case
 */
function kebab (str) {
	return str.replace(
		/[\sA-Z\u00C0-\u00D6\u00D8-\u00DE]/g,
		match => '-' + match.toLowerCase().replace(' ', '')
	)
	.replace(/-+/, '-')
	.replace(/^-/, '')
	.replace(/[^a-zA-Z\d-]/g, '');
}
