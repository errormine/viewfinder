import * as db from '$lib/server/mariadb';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    let userId = await db.getUserId(params.username);

    return {
        username: params.username,
        photos: await db.getRecentPhotos(userId)
    };
};