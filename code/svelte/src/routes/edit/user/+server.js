import * as db from '$lib/server/mariadb';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const { bio, pfp, email } = await request.json();

    if (bio) {
        return db.updateBio(1, bio)
            .then(res => {
                console.log(res);
                return new Response(JSON.stringify({ message: "User bio edited successfully."}), { status: 200 });
            })
            .catch(err => {
                console.log(err);
                return new Response(JSON.stringify({ error: "Failed to update user bio."}), { status: 500 });
            });
    }

    return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
};