import { json } from '@sveltejs/kit';
import * as database from '$lib/db/mariadb';

export const GET = async ({ params, request }) => {
    let userId = await database.getUserId(params.username);
    let displayName = await database.getDisplayName(userId);

    return json({ userId, displayName });
}