import * as db from '$lib/server/mariadb';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    let albumId = params.id;

    return {
        album: await db.getAlbum(albumId),
        photos: await db.getAlbumPhotos(albumId)
    };
};