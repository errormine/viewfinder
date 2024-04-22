import * as db from '$lib/server/mariadb';
import { lucia } from '$lib/server/auth';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
    const auth_session = cookies.get('auth_session');
    const { user, session } = await lucia.validateSession(auth_session);
    if (!session) return new Response(JSON.stringify({ error: "Invalid session."}), { status: 401 });

    const formData = await request.formData();
    if (!formData) return new Response(JSON.stringify({ error: "No data provided."}), { status: 400 });

    // user.id is the follower
    const userId = formData.get('userId');
    const follow = formData.get('follow');

    if (follow == 'true') {
        return db.followUser(userId, user.id)
            .then(res => {
                console.log(res);
                return new Response(JSON.stringify({ message: "User followed successfully."}), { status: 200 });
            })
            .catch(err => {
                console.log(err);
                return new Response(JSON.stringify({ error: "User does not exist."}), { status: 500 });
            });
    } else {
        return db.unfollowUser(userId, user.id)
            .then(res => {
                console.log(res);
                return new Response(JSON.stringify({ message: "User unfollowed successfully."}), { status: 200 });
            })
            .catch(err => {
                console.log(err);
                return new Response(JSON.stringify({ error: "User does not exist."}), { status: 500 });
            });
    }
};
