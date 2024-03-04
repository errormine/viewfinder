import * as db from '$lib/server/mariadb';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
	let userId = await db.getUserId(params.username);

	return {
		username: params.username,
		userId: userId,
		displayName: await db.getDisplayName(userId),
		photosCount: await db.getPhotosCount(userId),
		followersCount: await db.getFollowersCount(userId),
		followingCount: await db.getFollowingCount(userId)
	};
}