import * as Minio from "minio";
import { MINIO_ENDPOINT, MINIO_ACCESS_KEY, MINIO_SECRET_KEY } from '$env/static/private';

export const minioClient = new Minio.Client({
    endPoint: MINIO_ENDPOINT,
    port: 80,
    useSSL: false,
    accessKey: MINIO_ACCESS_KEY,
    secretKey: MINIO_SECRET_KEY,
})
