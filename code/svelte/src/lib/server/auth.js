// https://lucia-auth.com/tutorials/github-oauth/sveltekit
import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { MariaDBAdapter } from '$lib/adapters/mariadb';
import { Google } from 'arctic';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } from '$env/static/private';

const adapter = new MariaDBAdapter();

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: !dev
        }
    },
    // attributes defined in getSessionAndUser() in MariaDBAdapter
    getUserAttributes: (attributes) => {
        return {
            email: attributes.email,
            username: attributes.username
        };
    }
});

let baseUrl = import.meta.env.DEV ? 'http://localhost:5173' : BASE_URL;

export const google = new Google(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    `${baseUrl}/auth/google/callback`
);

