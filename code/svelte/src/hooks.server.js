// https://lucia-auth.com/guides/validate-session-cookies/sveltekit
import { lucia } from "$lib/server/auth";
import { NO_DB } from "$env/static/private";

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	if (NO_DB == "true") {
		event.locals.user = {
			id: 1,
			email: "email@example.com",
			username: "username",
			picture: "https://picsum.photos/128",
			displayName: "Jane Doe",
		}
		return resolve(event);
	}

	const sessionId = event.cookies.get(lucia.sessionCookieName);

	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
        return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);

	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		// sveltekit types deviates from the de-facto standard
		// you can use 'as any' too
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
	}

	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
	}

	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};
