import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { lucia, google } from "$lib/server/auth";
import * as db from "$lib/server/mariadb";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ event, url, cookies }) {
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    const storedState = cookies.get("google_oauth_state") ?? null;
    const storedCodeVerifier = cookies.get("google_oauth_code_verifier") ?? null;

    if (!code || !state || !storedCodeVerifier || state !== storedState) {
        return new Response(null, { status: 400 });
    }

    try {
        // https://arctic.js.org/providers/google
        const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);
        const googleUserResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });
        const googleUser = await googleUserResponse.json();
        console.log(googleUser);

        const existingUser = await db.getAuthRow("SELECT * FROM user WHERE email = ?", [googleUser.email]);
        console.log(existingUser);
        
        if (existingUser) {
            const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
            cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes
            });
        } else {
            const userId = generateId(15);

            const result = await db.performAuthQuery("INSERT INTO user (id, email) VALUES (?, ?)", [
                userId,
                googleUser.email
            ]);
            console.log(result);

            const session = await lucia.createSession(userId, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes
            });
        }

        return new Response(null, { status: 302, headers: { Location: "/" } });
    } catch (e) {
        console.log(e);
        if (e instanceof OAuth2RequestError) {
            return new Response(null, { status: 400 });
        }
        return new Response(null, { status: 501 });
    }
}