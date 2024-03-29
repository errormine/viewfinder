import * as db from '$lib/server/mariadb';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    const searchQuery = url.searchParams.get('q');

    return {
        results: await db.searchPhotos(`%${searchQuery}%`),
    };
};
