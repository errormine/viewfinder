import * as db from '$lib/server/mariadb';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const searchQuery = url.searchParams.get('q');

    return new Response(JSON.stringify(await db.searchTitles(searchQuery)), { status: 200 });
};
