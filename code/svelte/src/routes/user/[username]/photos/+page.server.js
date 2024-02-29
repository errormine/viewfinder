import * as db from '$lib/server/mariadb';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    let userId = await db.getUserId(params.username);

    return {
        photos: await db.getPhotos(userId) // This should eventually be optimized with pagination
    };
};