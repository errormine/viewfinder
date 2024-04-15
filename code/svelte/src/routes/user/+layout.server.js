import * as db from '$lib/server/mariadb';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals, params }) {
	let userId = await db.getUserId(params.username);
	let isFollowing = false;

	if (locals.user) {
		isFollowing = await db.isFollowing(userId, locals.user.id)
	}

	return {
		username: params.username,
		userId: userId,
		picture: await db.getProfilePicture(userId),
		displayName: await db.getDisplayName(userId),
		photosCount: await db.getPhotosCount(userId),
		followersCount: await db.getFollowersCount(userId),
		followingCount: await db.getFollowingCount(userId),
		isFollowing: isFollowing
	};
}
