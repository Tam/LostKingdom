const Events = {};

export const EventTypes = {
	MyEventName: 'MyEventName',
};

/**
 * Trigger an event
 *
 * EventTrigger(EventTypes.MyEventName, ...args);
 *
 * @param {string} event
 * @param {*} args
 */
export function EventTrigger (event, ...args) {
	if (!Events.hasOwnProperty(event)) return;

	for (let i = 0, l = Events[event].length; i < l; i++)
		Events[event][i](...args);
}

/**
 * Subscribe to an event
 *
 * useEffect(
 *   () => EventSubscribe(EventTypes.MyEventName, (...args) => {}),
 *   []
 * );
 *
 * @param {string} event
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
