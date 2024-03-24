/** @type {import('@sveltejs/kit').PageServerLoad} */
export async function load({ locals }) {
	if (!locals.user) {
        return {
            loggedIn: false
        }
    }

	return {
        loggedIn: true,
        user: locals.user,
	};
};
