import prisma from "../prisma";
import {Category} from "@prisma/client";

export class CategoryRepository {
    create(name: string): Promise<Category> {
        return prisma.category.create({data: {name}});
    }

    findAll(): Promise<Category[] | null> {
        return prisma.category.findMany();
    }

    findById(id: number): Promise<Category | null> {
        return prisma.category.findUnique({
            where: {id}
        });
    }

    findByName(name: string): Promise<Category | null> {
        return prisma.category.findFirst({
            where: {name}
        });
    }
}

export const categoryRepository = new CategoryRepository();
