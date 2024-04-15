import * as db from '$lib/server/mariadb';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { id } = params;
    const creatorId = await db.getPhotoCreatorId(id);
    
    return {
        photo: await db.getPhoto(id),
        linkedAlbums: await db.getAlbumsByPhoto(id),
        creator: {
            username: await db.getUsername(creatorId),
            picture: await db.getProfilePicture(creatorId),
        },
        comments: await db.getComments(id),
    };
};
