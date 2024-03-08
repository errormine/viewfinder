import { redirect } from "@sveltejs/kit";
import { generateState, generateCodeVerifier } from "arctic";
import { google } from "$lib/server/auth";

/** @type {import('@sveltejs/kit').RequestEvent} */
export async function GET({ cookies }) {
	const state = generateState();
    const codeVerifier = generateCodeVerifier();
	const url = await google.createAuthorizationURL(state, codeVerifier, {
		scopes: ["email", "profile"]
	});

	cookies.set("google_oauth_state", state, {
		path: "/",
		secure: import.meta.env.PROD,
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax"
	});

    cookies.set("google_oauth_code_verifier", codeVerifier, {
        path: "/",
        secure: import.meta.env.PROD,
        httpOnly: true,
        maxAge: 60 * 10,
    });

	redirect(302, url.toString());
}
