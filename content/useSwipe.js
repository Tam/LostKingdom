/*---
tags: interaction,swipe
description: Tiny X-axis swipe handler
---*/
import { useEffect, useRef, MutableRefObject } from 'react';

/**
 * Tiny X-axis swipe handler
 *
 * dir < 0 === right to left
 * dir > 0 === left to right
 *
 * ```js
 * const swipeRef = useSwipe(distanceTravelledInDirection => ...);
 *
 * // ...
 *
 * <div ref={swipeRef} />
 * ```
 *
 * @param {(dir: number) => void} callback
 * @return {MutableRefObject<T>}
 */
export default function useSwipe (callback) {
	const ref = useRef();

	useEffect(() => {
		if (!ref.current) return;
		const el = ref.current;

		let touchStart = 0,
			touchEnd   = 0;

		const onTouchStart = e => touchStart = e.changedTouches[0].screenX;
		const onTouchEnd = e => {
			touchEnd = e.changedTouches[0].screenX;
			callback(touchEnd - touchStart);
		};

		el.addEventListener('touchstart', onTouchStart);
		el.addEventListener('touchend', onTouchEnd);

		return () => {
			el.removeEventListener('touchstart', onTouchStart);
			el.removeEventListener('touchend', onTouchEnd);
		};
	}, [ref, callback]);

	return ref;
}
