/**
 * Get the time from now until the given date in the format of
 * X years, X months, X weeks, X days, X hours, and X minutes
 * hiding and pluralising values accordingly.
 *
 * @param {Date|number|string} date
 * @return {string|null}
 */
export default function until (date) {
	date = new Date(date);
	const now = new Date();

	if (date < now)
		return null;

	let y = date.getFullYear() - now.getFullYear(),
		m = date.getMonth() - now.getMonth(),
		d = date.getDate() - now.getDate(),
		h = date.getHours() - now.getHours(),
		i = date.getMinutes() - now.getMinutes();

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
	if (h > 0 && i < 0) {
		h--;
		i += 60;
	}

	const s = v => v === 1 ? '' : 's';

	return [
		y > 0 ? `${y} year${s(y)}` : null,
		m > 0 ? `${m} month${s(m)}` : null,
		w > 0 ? `${w} week${s(w)}` : null,
		d > 0 ? `${d} day${s(d)}` : null,
		h > 0 ? `${h} hour${s(h)}` : null,
		i > 0 ? `${i} minute${s(i)}` : null,
	].filter(Boolean).join(', ').replace(/,([^,]*)$/, ', and $1');
}
