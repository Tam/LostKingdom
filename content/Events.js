/*---
description: A tiny events system
---*/
const Events = {};

const DEBUG = process.env.NODE_ENV === 'development';

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
export const Event = {
	MyEventA: iota(),
	MyEventB: iota(),
};

/**
 * Trigger an event
 *
 * Emit(Event.MyEventA, ...args);
 *
 * @param {number} event - A single event type
 * @param {*} args
 */
export function Emit (event, ...args) {
	DEBUG && console.groupCollapsed(
		'%cEmit %c' +
		Object.entries(Events).reduce((a, [name, bit]) => {
			if ((bit & event) === event)
				return [...a, name];

			return a;
		}, []).join(', ') + (args.length > 0 ? '%c:' : ''),
		'color: grey;',
		'font-weight: bold;',
		(args.length > 0 ? 'color: grey;' : ' '),
		...args
	);

	const callbacks = Object.entries(_Events);

	for (let [bit, cbs] of callbacks) {
		if ((bit & event) === event) {
			for (let i = 0, l = cbs.length; i < l; i++) {
				cbs[i](...args, event);
				DEBUG && console.log(
					'%cListen%c',
					'color: grey;',
					'',
					cbs[i]
				);
			}
		}
	}

	DEBUG && console.groupEnd();
}

/**
 * Subscribe to an event
 *
 * useEffect(
 *   () => Listen(Event.MyEventA|Event.MyEventB, (...args) => {}),
 *   []
 * );
 *
 * @param {number} event - One or more event types, Bitwise OR'd together
 * @param {Function} func
 * @return {function(): void} - The unsubscribe function
 */
export function Listen (event, func) {
	if (!Events.hasOwnProperty(event))
		Events[event] = [];

	Events[event].push(func);

	return () => {
		const i = Events[event].indexOf(func);
		if (i === -1) return;

		Events[event].splice(i, 1);
	};
}
