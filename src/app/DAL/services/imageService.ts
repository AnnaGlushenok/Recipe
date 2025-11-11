import {imageRepository} from "../repositories/imageRepository";

class ImageService {
    async create(file: File) {
        return imageRepository.create(file);
    }
}

export const imageService = new ImageService();
