/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    return {
        username: params.username,
    };
};