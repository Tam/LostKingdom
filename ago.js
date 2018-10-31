export default class Ago {

	// Properties
	// =========================================================================

	static locales = {
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

	// Methods
	// =========================================================================

	/**
	 * Ago.inWords(myDate);
	 *
	 * @param {Date|number} timeAgo
	 * @return {string}
	 */
	static inWords (timeAgo) {
		if (timeAgo instanceof Date)
			timeAgo = timeAgo.getTime();

		const separator = this.locales.separator || ' ';

		let seconds = Math.floor((new Date() - parseInt(timeAgo)) / 1000),
			interval,
			words = this.locales.prefix + separator;

		const intervals = {
			year:   seconds / 31536000,
			month:  seconds / 2592000,
			day:    seconds / 86400,
			hour:   seconds / 3600,
			minute: seconds / 60
		};

		let distance = this.locales.seconds;

		for (let key in intervals) {
			interval = Math.floor(intervals[key]);

			if (interval > 1) {
				distance = this.locales[key + 's'];
				break;
			} else if (interval === 1) {
				distance = this.locales[key];
				break;
			}
		}

		distance = distance.replace(/%d/i, interval);
		words += distance + separator + this.locales.suffix;

		return words.trim();
	}

}
