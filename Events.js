const Events = {};

/**
 * Self incrementing bit (increments by 1 every time it's called)
 *
 * @returns {number}
 */
const iota = (i => () => 1 << ++i)(-1);

/**
 * The Event types
 *
 * @type {Object}
 */
export const EventTypes = {
	MyEventA: iota(),
	MyEventB: iota(),
};

/**
 * Trigger an event
 *
 * EventTrigger(EventTypes.MyEventA, ...args);
 *
 * @param {string} event - A single event type
 * @param {*} args
 */
export function EventTrigger (event, ...args) {
	const callbacks = Object.entries(Events);

	for (let [bit, cbs] of callbacks)
		if ((bit & event) === event)
			for (let i = 0, l = cbs.length; i < l; i++)
				cbs[i](...args);
}

/**
 * Subscribe to an event
 *
 * useEffect(
 *   () => EventSubscribe(EventTypes.MyEventA|EventTypes.MyEventB, (...args) => {}),
 *   []
 * );
 *
 * @param {string} event - One or more event types, Bitwise OR'd together
 * @param {Function} func
 * @return {function(): void} - The unsubscribe function
 */
export function EventSubscribe (event, func) {
	if (!Events.hasOwnProperty(event))
		Events[event] = [];

	Events[event].push(func);

	return () => {
		const i = Events[event].indexOf(func);
		if (i === -1) return;

		Events[event].splice(i, 1);
	};
}
