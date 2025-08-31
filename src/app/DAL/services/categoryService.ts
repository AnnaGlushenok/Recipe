import {categoryRepository} from "../repositories/categoryRepository";

class CategoryService {
    async create(name: string) {
        return categoryRepository.create(name);
    }

    async getAll() {
        return categoryRepository.findAll();
    }

    async getById(id: number) {
        return categoryRepository.findById(id);
    }

    async getByName(name: string) {
        return categoryRepository.findByName(name);
    }
}

export const categoryService = new CategoryService();
