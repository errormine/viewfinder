import { redirect } from '@sveltejs/kit';
import * as db from '$lib/server/mariadb';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    if (!locals.user) redirect(302, "/");

    let photos = await db.getRecentUploads(locals.user.id);
    let comments = await db.getRecentComments(locals.user.id);
    let favorites = await db.getRecentFavorites(locals.user.id);

    let activity = photos.concat(comments).concat(favorites).sort((a, b) => b.Timestamp - a.Timestamp);

    return {
        activity
    };
};
