import * as db from '$lib/server/mariadb';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const { photo } = await request.json();


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