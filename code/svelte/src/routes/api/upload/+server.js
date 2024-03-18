import * as db from '$lib/server/mariadb';
import { lucia } from '$lib/server/auth';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
    const { photo } = await request.json();
    const auth_session = cookies.get('auth_session');
    const { user, session } = await lucia.validateSession(auth_session);
    console.log(user);

    if (!session) {
        return new Response(JSON.stringify({ error: "Invalid session."}), { status: 401 });
    }

    if (photo) {
        return db.uploadPhoto(user.id, photo)
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
