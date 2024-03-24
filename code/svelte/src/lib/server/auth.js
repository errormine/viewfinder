// https://lucia-auth.com/tutorials/github-oauth/sveltekit
import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { MariaDBAdapter } from '$lib/adapters/mariadb';
import { Google } from 'arctic';
import { dirname } from '@sveltejs/kit';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';

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

const baseUrl = import.meta.env.DEV ? `http://localhost:5173` : `${dirname(import.meta.url)}`;
const redirectUri = `${baseUrl}/auth/google/callback`;

export const google = new Google(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    redirectUri
);

