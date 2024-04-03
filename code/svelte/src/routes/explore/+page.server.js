import * as db from '$lib/server/mariadb';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        photos: await db.getSuggestedPhotos(),
    };
};
