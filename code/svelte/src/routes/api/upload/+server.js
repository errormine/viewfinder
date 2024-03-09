import * as db from '$lib/server/mariadb';
import { lucia } from '$lib/server/auth';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
    const { photo } = await request.json();
    const session = cookies.get('auth_session');
    console.log(session);

    if (!session) {
        return new Response(JSON.stringify({ error: "Not authenticated."}), { status: 401 });
    }

    if (!lucia.validateSession(session)) {
        return new Response(JSON.stringify({ error: "Invalid session."}), { status: 401 });
    }

    if (photo) {
        return db.uploadPhoto(1, photo)
            .then(res => {
                console.log(res);
                return new Response(JSON.stringify({ message: "Image uploaded successfully."}), { status: 200 });
            })
            .catch(err => {
                console.log(err);
                return new Response(JSON.stringify({ error: "Failed to upload image."}), { status: 500 });
            });
    }

    return new Response(JSON.stringify({ error: "No data provided."}), { status: 400 });
};
