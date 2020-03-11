const LOCALES = {
	prefix:    '',
	suffix:    'ago',
	separator: ' ',

	seconds: 'less than a minute',
	minute:  'about a minute',
	minutes: '%d minutes',
	hour:    'about an hour',
	hours:   'about %d hours',
	day:     'a day',
	days:    '%d days',
	month:   'about a month',
	months:  '%d months',
	year:    'about a year',
	years:   '%d years',
};

/**
 * Converts the given date to time ago in words
 *
 * @param {Date|string|number} timeAgo
 * @return {string}
 */
export default function ago (timeAgo) {
	if (typeof timeAgo === 'string')
		timeAgo = new Date(timeAgo);

	if (timeAgo instanceof Date)
		timeAgo = timeAgo.getTime();

	const separator = LOCALES.separator || ' ';

	let seconds = Math.floor((new Date() - parseInt(timeAgo)) / 1000),
		interval,
		words = LOCALES.prefix + separator;

	const intervals = {
		year:   seconds / 31536000,
		month:  seconds / 2592000,
		day:    seconds / 86400,
		hour:   seconds / 3600,
		minute: seconds / 60
	};

	let distance = LOCALES.seconds;

	for (let key in intervals) {
		interval = Math.floor(intervals[key]);

		if (interval > 1) {
			distance = LOCALES[key + 's'];
			break;
		} else if (interval === 1) {
			distance = LOCALES[key];
			break;
		}
	}

	distance = distance.replace(/%d/i, interval);
	words += distance + separator + LOCALES.suffix;

	return words.trim();
}
