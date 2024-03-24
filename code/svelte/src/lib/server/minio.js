import * as Minio from "minio";

export const minioClient = new Minio.Client({
    endPoint: 'system54.rice.iit.edu',
    port: 80,
    useSSL: false,
    accessKey: 'aneacsu',
    secretKey: '02f9b7de-e7d1-11ee-b28f-f718b89f371amc',
})
