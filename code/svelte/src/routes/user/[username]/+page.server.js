import * as db from '$lib/server/mariadb';

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }) {
    // Waits for +layout.server.js to finish loading
    const { userId } = await parent();

    return {
        website: await db.getWebsite(userId),
        contact: await db.getContact(userId),
        location: await db.getLocation(userId),
        joinDate: await db.getJoinDate(userId),
        bio: (await db.getBio(userId)).replace(/<[^>]*>/g, ''),
        recentPhotos: await db.getRecentPhotos(userId)
    };
};