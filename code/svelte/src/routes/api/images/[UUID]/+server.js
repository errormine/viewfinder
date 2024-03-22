import { minioClient } from '$lib/server/minio';
import { S3_BUCKET } from '$env/static/private';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    const image = await minioClient.getObject(S3_BUCKET, params.UUID);

    return new Response(image);
};
