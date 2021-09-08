/*---
description: Approximate the distance between point A and point B, a faster but less accurate alternative to haversine for use on short distances
tags: location,map
---*/
const R = 6371e3; // Earths radius in M

/**
 * Assume equirectangular map projection and use pythagorean theorem to get a
 * best guess of the distance between to lat/lngs
 *
 * @param {{lat:number,lng:number}} a
 * @param {{lat:number,lng:number}} b
 * @returns {number}
 */
export default function equirectangularApprox (a, b) {
	const x = (b.lng - a.lng) * Math.cos((a.lat + b.lat) / 2)
		, y = (b.lat - a.lat);

	return Math.sqrt(x * x + y * y) * R;
}
