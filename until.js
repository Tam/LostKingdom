/**
 * Get the time from now until the given date in the format of
 * X years, X months, X weeks, X days, X hours, X minutes, and X seconds
 * hiding and pluralising values accordingly.
 *
 * @param {Date|number|string} date
 * @param {Date|number|string|null} now - Defaults to current time if null
 * @param {number} bitmask - The values to show in the string output (or as an object)
 * @return {string|null|{s: number, d: number, w: number, h: number, y: number, i: number, m: number}}
 */
export default function until (
	date,
	now = null,
	bitmask = until.DATE
) {
	date = new Date(date);
	now = now ? new Date(now) : new Date();

	if (date < now)
		return null;

	let y = date.getFullYear() - now.getFullYear(),
		m = date.getMonth() - now.getMonth(),
		d = date.getDate() - now.getDate(),
		h = date.getUTCHours() - now.getUTCHours(),
		i = date.getUTCMinutes() - now.getUTCMinutes(),
		s = date.getUTCSeconds() - now.getUTCSeconds();

	const ny = now.getFullYear();

	if (m < 0) {
		y--;
		m += 12;
	}

	if (d < 0) {
		if (m > 0) m--;
		else {
			y--;
			m = 11;
		}

		d += [
			31,
			(ny % 4 === 0 && ny % 100 !== 0) || ny % 400 === 0 ? 29 : 28,
			31,
			30,
			31,
			30,
			31,
			31,
			30,
			31,
			30,
			31,
		][now.getMonth()];
	}

	let w = Math.floor(d / 7);
	if (w > 0) d %= 7;

	if (h < 0) {
		if (d > 0) d--;
		h += 24;
	}

	if (i < 0) {
		if (h > 0) h--;
		i += 60;
	}

	if (s < 0) {
		if (i > 0) i--;
		s += 60;
	}

	const p = v => v === 1 ? '' : 's';

	if (bitmask & until.OBJECT)
		return { y, m, w, d, h, i, s };

	!(bitmask & until.YEAR)   && (y = 0);
	!(bitmask & until.MONTH)  && (m = 0);
	!(bitmask & until.WEEK)   && (w = 0);
	!(bitmask & until.DAY)    && (d = 0);
	!(bitmask & until.HOUR)   && (h = 0);
	!(bitmask & until.MINUTE) && (i = 0);
	!(bitmask & until.SECOND) && (s = 0);

	return [
		y > 0 ? `${y} year${p(y)}` : null,
		m > 0 ? `${m} month${p(m)}` : null,
		w > 0 ? `${w} week${p(w)}` : null,
		d > 0 ? `${d} day${p(d)}` : null,
		h > 0 ? `${h} hour${p(h)}` : null,
		i > 0 ? `${i} minute${p(i)}` : null,
		s > 0 ? `${s} second${p(s)}` : null,
	].filter(Boolean).join(', ').replace(/,([^,]*)$/, ', and $1');
}

until.OBJECT   = 1<<0;
until.YEAR     = 1<<1;
until.MONTH    = 1<<2;
until.WEEK     = 1<<3;
until.DAY      = 1<<4;
until.HOUR     = 1<<5;
until.MINUTE   = 1<<6;
until.SECOND   = 1<<7;
until.DATE     = until.YEAR | until.MONTH | until.WEEK | until.DAY;
until.TIME     = until.HOUR | until.MINUTE | until.SECOND;
until.DATETIME = until.DATE | until.TIME;
