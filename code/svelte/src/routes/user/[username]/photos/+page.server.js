import * as db from '$lib/server/mariadb';

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }) {
    let { userId } = await parent();

    return {
        photos: await db.getPhotos(userId) // This should eventually be optimized with pagination
    };
};