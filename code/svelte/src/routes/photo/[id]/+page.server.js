import * as db from '$lib/server/mariadb';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
    const { id } = params;
    const creatorId = await db.getPhotoCreatorId(id);
    let isFavorite = false;
    if (locals.user) {
        isFavorite = await db.isFavorite(locals.user.id, id);
    }
    
    return {
        photo: await db.getPhoto(id),
        favorites: await db.getPhotoFavorites(id),
        isFavorite,
        linkedAlbums: await db.getAlbumsByPhoto(id),
        creator: {
            username: await db.getUsername(creatorId),
            picture: await db.getProfilePicture(creatorId),
        },
        comments: await db.getComments(id),
    };
};
