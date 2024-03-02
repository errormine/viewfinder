import * as db from '$lib/server/mariadb';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
	// Provide placeholder values if the database is not available
	let dbConnection = await db.testConnection();

	if (!dbConnection) {
		return {
			username: params.username,
			userId: -1,
			displayName: "Placeholder User",
			photosCount: 1,
			followersCount: 2,
			followingCount: 30
		};
	}

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