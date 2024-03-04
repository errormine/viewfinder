import * as db from '$lib/server/mariadb';

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }) {
    const { userId } = await parent();

    return {
        albums: await db.getAlbums(userId)
    };
};