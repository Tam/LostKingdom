/*---
tags: dom
description: A textarea that resizes to its contents (but for react)
---*/
export default function Textarea () {
	const onInput = e => {
		let { borderTopWidth, borderBottomWidth } = window.getComputedStyle(e.target);
		borderTopWidth = +borderTopWidth.replace(/[^\d.]/g, '');
		borderBottomWidth = +borderBottomWidth.replace(/[^\d.]/g, '');
		e.target.style.height = '';
		e.target.style.height = (e.target.scrollHeight + borderTopWidth + borderBottomWidth) + 'px';
	};
	
	return (
		<textarea onInput={onInput} />
	);
}
