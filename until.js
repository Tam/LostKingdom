/**
 * Get the time from now until the given date in the format of
 * X years, X months, X weeks, and X days
 * hiding and pluralising values accordingly.
 *
 * @param {Date|number|string} date
 * @param {Date|number|string|null} now
 * @return {string|null}
 */
export default function until (date, now = null) {
	date = new Date(date);
	now = now ? new Date(now) : new Date();

	if (date < now)
		return null;

	let y = date.getFullYear() - now.getFullYear(),
		m = date.getMonth() - now.getMonth(),
		d = date.getDate() - now.getDate();

	if (y + m + d === 0)
		return '1 day';

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

	const w = Math.floor(d / 7);

	if (w > 0) d %= 7;

	const s = v => v === 1 ? '' : 's';

	return [
		y > 0 ? `${y} year${s(y)}` : null,
		m > 0 ? `${m} month${s(m)}` : null,
		w > 0 ? `${w} week${s(w)}` : null,
		d > 0 ? `${d} day${s(d)}` : null,
	].filter(Boolean).join(', ').replace(/,([^,]*)$/, ', and $1');
}
