import * as db from '$lib/server/mariadb';
import { lucia } from '$lib/server/auth';

/** @type {import('./$types').RequestHandler} */
export async function POST({ params, request, cookies }) {
    const auth_session = cookies.get('auth_session');
    const { user, session } = await lucia.validateSession(auth_session);
    if (!session) return new Response(JSON.stringify({ error: "Invalid session."}), { status: 401 });

    const photoId = params.id;

    return db.favoritePhoto(user.id, photoId)
        .then(res => {
            console.log(res);
            return new Response(JSON.stringify({ message: "Photo favorited successfully."}), { status: 200 });
        })
        .catch(err => {
            console.log(err);
            return new Response(JSON.stringify({ error: "Failed to favorite photo."}), { status: 500 });
        });
};

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params, request, cookies }) {
    const auth_session = cookies.get('auth_session');
    const { user, session } = await lucia.validateSession(auth_session);
    if (!session) return new Response(JSON.stringify({ error: "Invalid session."}), { status: 401 });

    const photoId = params.id;

    return db.unfavoritePhoto(user.id, photoId)
        .then(res => {
            console.log(res);
            return new Response(JSON.stringify({ message: "Photo unfavorited successfully."}), { status: 200 });
        })
        .catch(err => {
            console.log(err);
            return new Response(JSON.stringify({ error: "Failed to unfavorite photo."}), { status: 500 });
        });
};
