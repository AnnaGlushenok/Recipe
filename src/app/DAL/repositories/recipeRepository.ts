import prisma from "../prisma";
import {Recipe} from "@prisma/client";

export default class RecipeRepository {
    create(data: Omit<Recipe, "id">): Promise<Recipe> {
        return prisma.recipe.create({data});
    }

    findAll() {
        return prisma.recipe.findMany({
            include: {category: true},
        })
    }

    findById(id: number): Promise<Recipe | null> {
        return prisma.recipe.findUnique({
            where: {id},
            include: {category: true},
        });
    }

    update(data: Recipe): Promise<Recipe | null> {
        return prisma.recipe.update({
            where: {
                id: data.id
            },
            data: data
        })
    }

    delete(id: number) {
        return prisma.recipe.delete({
            where: {id},
        })
    }
}

export const recipeRepository = new RecipeRepository();
