import * as db from '$lib/server/mariadb';

/** @type {import('./$types').RequestHandler} */
export async function POST({ locals, request }) {
	const user = locals.user;
	if (!user) return new Response(JSON.stringify({ error: "Unauthorized." }), { status: 401 });
	
	const data = await request.formData();
	if (!data) return new Response(JSON.stringify({ error: "No data provided." }), { status: 400 });

    const albumId = data.get('albumId');
    const name = data.get('name');
    const description = data.get('description');
    const photoIDs = data.get('photoIDs');

	if (!albumId || !name || !description) return new Response(JSON.stringify({ error: "Missing required fields." }), { status: 400 });

	return db.createOrUpdateAlbum(albumId, locals.user.id, name, description, photoIDs)
		.then(res => {
			console.log(res);
			return new Response(JSON.stringify({ message: "Album updated successfully." }), { status: 200 });
		})
		.catch(err => {
			console.log(err);
			return new Response(JSON.stringify({ error: "Failed to update album." }), { status: 500 });
		});
};
