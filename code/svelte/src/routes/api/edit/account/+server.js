import { lucia } from '$lib/server/auth';
import * as db from '$lib/server/mariadb';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
	const auth_session = cookies.get('auth_session');
	const { user, session } = await lucia.validateSession(auth_session);
	if (!session) return new Response(JSON.stringify({ error: "Invalid session."}), { status: 401 });

	const data = await request.formData();
	if (!data) return new Response(JSON.stringify({ error: "No data provided."}), { status: 400 });

	const displayName = data.get('displayName');
	const email = data.get('email');
	const username = data.get('username');

	if (!displayName || !email || !username) return new Response(JSON.stringify({ error: "Missing required fields."}), { status: 400 });

	return db.updateUser(user.id, displayName, email, username)
		.then(res => {
			console.log(res);
			return new Response(JSON.stringify({ message: "User updated successfully."}), { status: 200 });
		})
		.catch(err => {
			console.log(err);
			return new Response(JSON.stringify({ error: "Failed to update user."}), { status: 500 });
		});
};
