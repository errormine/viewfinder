/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
    return {
        session: await locals.auth(),
    };
};