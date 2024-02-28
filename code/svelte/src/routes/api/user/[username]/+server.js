import { json } from '@sveltejs/kit';
import * as database from '$lib/db/mariadb';

export const GET = async ({ params, request }) => {
    let result = await database.testConnection();

    return json(result);
}