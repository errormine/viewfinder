import * as db from '$lib/server/mariadb';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { id } = params;
    
    return {
        photo: await db.getPhoto(id),
    };
};