/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    const searchQuery = url.searchParams.get('q');
    return {};
};
