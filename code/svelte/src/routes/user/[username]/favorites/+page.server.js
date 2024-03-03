import * as db from '$lib/server/mariadb';

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }) {
    let { userId } = await parent();

    return {
        favorites: await db.getFavorites(userId) // This should eventually be optimized with pagination
    };
};