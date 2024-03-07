// https://authjs.dev/reference/sveltekit#handling-authorization
import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handle as handleAuthentication } from './auth';

/** @type {import('@sveltejs/kit').Handle} */
async function handleAuthorization({ event, resolve}) {
    if (event.url.pathname.startsWith('/upload')) {
        const session = await event.locals.auth();

        if (!session) {
            throw redirect(303, '/');
        }
    }

    return resolve(event);
}

export const handle = sequence(handleAuthentication, handleAuthorization)