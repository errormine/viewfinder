// https://lucia-auth.com/tutorials/github-oauth/sveltekit
import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { MariaDBAdapter } from '$lib/adapters/mariadb';
import { Google } from 'arctic';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';

const adapter = new MariaDBAdapter();

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: !dev
        }
    }
});

export const google = new Google(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    `http://localhost:5173/auth/google/callback`
);

