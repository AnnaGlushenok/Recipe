import {put} from "@vercel/blob";

export class ImageRepository {
    async create(file: File) {
        const blob = await put(file.name, file, {
            access: 'public',
            allowOverwrite: true
        });
        return blob.url;
    }
}

export const imageRepository = new ImageRepository();
