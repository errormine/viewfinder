import { redirect } from '@sveltejs/kit';
import * as db from '$lib/server/mariadb';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    if (!locals.user) redirect(302, "/");

    return {
        posts: await db.getRecentPosts(locals.user.id, 10),
    };
};
