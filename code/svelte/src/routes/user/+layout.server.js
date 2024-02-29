import * as db from '$lib/server/mariadb';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
	let userId = await db.getUserId(params.username);

	return {
		displayName: await db.getDisplayName(userId)
	};
}