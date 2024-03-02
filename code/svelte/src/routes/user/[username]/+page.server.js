import * as db from '$lib/server/mariadb';

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }) {
    // Waits for +layout.server.js to finish loading
    const { userId } = await parent();

    if (userId == -1) {
        return {
            bio: "This is a test user. They have no bio.",
            photos: []
        };
    }

    return {
        bio: (await db.getBio(userId)).replace(/<[^>]*>/g, ''),
        photos: await db.getRecentPhotos(userId)
    };
};