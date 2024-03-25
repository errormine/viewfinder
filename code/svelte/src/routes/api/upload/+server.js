import * as db from '$lib/server/mariadb';
import { minioClient } from '$lib/server/minio';
import { lucia } from '$lib/server/auth';
import { randomUUID } from 'crypto';
import { S3_BUCKET_NAME } from '$env/static/private';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
    const auth_session = cookies.get('auth_session');
    const { user, session } = await lucia.validateSession(auth_session);
    if (!session) return new Response(JSON.stringify({ error: "Invalid session."}), { status: 401 });

    const formData = await request.formData();
    if (!formData) return new Response(JSON.stringify({ error: "No data provided."}), { status: 400 });

    // Upload to minio and save information in database
    const UUID = randomUUID();
    // File blob -> Promise -> array buffer -> buffer I love javascript
    // https://nodejs.org/api/buffer.html
    const photo = Buffer.from(await formData.get('photo').arrayBuffer());
    const photoMetadata = {
        title: formData.get('title'),
        description: formData.get('description'),
        tags: formData.get('tags'),
    };

    return minioClient.putObject(S3_BUCKET_NAME, UUID, photo)
        .then(res => {
            console.log(res);
            return db.uploadPhoto(user.id, UUID, photoMetadata)
                .then(res => {
                    console.log(res);
                    return new Response(JSON.stringify({ message: "Image uploaded successfully."}), { status: 200 });
                })
        })
        .catch(err => {
            console.log(err);
            return new Response(JSON.stringify({ error: "Failed to upload image."}), { status: 500 });
        });
};
