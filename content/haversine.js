/*---
description: Calculate the distance between point A and point B
tags: location,map
---*/
/**
 * Calculate the distance between point A and point B
 *
 * @param {[Number, Number]} pointA - The [Lat, Lon] of point A
 * @param {[Number, Number]} pointB - The [Lat, Lon] of point B
 * @param useMiles - Return the result in miles (defaults to kilometres)
 * @returns {number}
 * @see https://stackoverflow.com/a/48805273/550109
 */
export default function haversine (pointA, pointB, useMiles = false) {
	let [lat1, lon1] = pointA,
		[lat2, lon2] = pointB;

	const toRadian = angle => (Math.PI / 180) * angle;
	const distance = (a, b) => (Math.PI / 180) * (a - b);
	const RADIUS_OF_EARTH_IN_KM = 6371;

	const dLat = distance(lat2, lat1);
	const dLon = distance(lon2, lon1);

	lat1 = toRadian(lat1);
	lat2 = toRadian(lat2);

	// Haversine Formula
	const a =
		Math.pow(Math.sin(dLat / 2), 2) +
		Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
	const c = 2 * Math.asin(Math.sqrt(a));

	let finalDistance = RADIUS_OF_EARTH_IN_KM * c;

	if (useMiles)
		finalDistance /= 1.60934;

	return finalDistance;
}
