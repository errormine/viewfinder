import * as db from '$lib/server/mariadb';
import { lucia } from '$lib/server/auth';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
    const auth_session = cookies.get('auth_session');
    const { user, session } = await lucia.validateSession(auth_session);
    if (!session) return new Response(JSON.stringify({ error: "Invalid session."}), { status: 401 });

    const formData = await request.formData();
    if (!formData) return new Response(JSON.stringify({ error: "No data provided."}), { status: 400 });

    return db.postComment(user.id, formData.get('photoID'), formData.get('content'))
        .then(res => {
            console.log(res);
            return new Response(JSON.stringify({ message: "Comment posted successfully."}), { status: 200 });
        })
        .catch(err => {
            console.log(err);
            return new Response(JSON.stringify({ error: "Failed to post comment."}), { status: 500 });
        });
};
