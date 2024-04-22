import * as db from '$lib/server/mariadb';
import { lucia } from '$lib/server/auth';
import { minioClient } from '$lib/server/minio';
import { S3_BUCKET_NAME } from '$env/static/private';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params, request, cookies }) {
    const auth_session = cookies.get('auth_session');
    const { user, session } = await lucia.validateSession(auth_session);
    if (!session) return new Response(JSON.stringify({ error: "Invalid session."}), { status: 401 });

    if (!params.id) return new Response(JSON.stringify({ error: "Invalid request."}), { status: 400 });

    let UUID = await db.getPhotoUUID(params.id);
    if (!UUID) return new Response(JSON.stringify({ error: "Photo not found."}), { status: 404 });

    return db.deletePhoto(user.id, params.id)
        .then(res => {
            console.log(res);
            return minioClient.removeObject(S3_BUCKET_NAME, UUID)
                .then(() => {
                    console.log("Object removed from min.io")
                    return new Response(JSON.stringify({ success: "Photo deleted."}), { status: 200 });
                });
        })
        .catch(err => {
            console.log(err);
            return new Response(JSON.stringify({ error: "Failed to delete photo."}), { status: 500 });
        });
};
