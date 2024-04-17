import * as db from '$lib/server/mariadb';

/** @type {import('./$types').RequestHandler} */
export async function POST({ locals, request }) {
	const user = locals.user;
	if (!user) return new Response(JSON.stringify({ error: "Unauthorized." }), { status: 401 });
	
	const data = await request.formData();
	if (!data) return new Response(JSON.stringify({ error: "No data provided." }), { status: 400 });

	const bio = data.get('bio');

	return db.updateBio(user.id, bio)
		.then(res => {
			console.log(res);
			return new Response(JSON.stringify({ message: "User updated successfully." }), { status: 200 });
		})
		.catch(err => {
			console.log(err);
			return new Response(JSON.stringify({ error: "Failed to update user." }), { status: 500 });
		});
};
