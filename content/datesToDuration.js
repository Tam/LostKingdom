/*---
tags: date,time,format
description: Converts two dates into a human readable duration string
---*/
/**
 * Converts two dates into a human readable duration string
 *
 * @param {Date|int|string} from
 * @param {Date|int|string} to
 * @param {Object=} opts
 * @return {string}
 */
export default function datesToDuration (
	from,
	to,
	opts = {
		show: {
			years: true,
			days: true,
			hours: true,
			minutes: true,
			seconds: true,
			second: true,
		},
		labels: {
			years: 'y',
			days: 'd',
			hours: 'h',
			minutes: 'm',
			seconds: 's',
			second: 's',
		},
	},
) {
	if (typeof from === 'string') from = new Date(from);
	if (typeof to   === 'string') to   = new Date(to);

	let ms = Math.abs((to - from) / 1000);

	const y = Math.floor(ms / 31536000)
		, d = Math.floor((ms %= 31536000) / 86400)
		, h = Math.floor((ms %= 86400) / 3600)
		, m = Math.floor((ms %= 3600) / 60)
		, s = ms % 60 ? (ms % 60).toFixed(2) : 0;

	if (!(y || d || h || m || s) && opts.show.second)
		return `< 1${opts.labels.second}`;

	return (
		(opts.show.years   && y ? `${y}${opts.labels.years} `   : '') +
		(opts.show.days    && d ? `${d}${opts.labels.days} `    : '') +
		(opts.show.hours   && h ? `${h}${opts.labels.hours} `   : '') +
		(opts.show.minutes && m ? `${m}${opts.labels.minutes} ` : '') +
		(opts.show.seconds && s ? `${s}${opts.labels.seconds} ` : '')
	).trim();
}
