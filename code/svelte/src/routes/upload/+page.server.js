/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    if (!locals.user) redirect(302, "/");

    return {
        username: locals.user.username,
    };
};