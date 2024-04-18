import * as db from '$lib/server/mariadb';

/** @type {import('./$types').RequestHandler} */
export async function POST({ locals, request }) {
	const user = locals.user;
	if (!user) return new Response(JSON.stringify({ error: "Unauthorized." }), { status: 401 });
	
	const data = await request.formData();
	if (!data) return new Response(JSON.stringify({ error: "No data provided." }), { status: 400 });

	const bio = data.get('bio');
	const website = data.get('website');
	const location = data.get('location');
	const contact = data.get('contact');

	try {
		if (bio) {
			await db.updateBio(user.id, bio);
		}

		if (!website || !location || !contact) return;
		await db.updateProfile(user.id, website, location, contact);
		return new Response(JSON.stringify({ message: "User updated	successfully." }), { status: 200 });
	} catch (err) {
		console.log(err);
		return new Response(JSON.stringify({ error: "Failed to update user." }), { status: 500 });
	}
};
