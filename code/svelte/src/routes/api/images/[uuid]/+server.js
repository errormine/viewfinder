import { minioClient } from '$lib/server/minio';
import { S3_BUCKET_NAME } from '$env/static/private';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    const image = await minioClient.getObject(S3_BUCKET_NAME, params.uuid);

    return new Response(image);
};
