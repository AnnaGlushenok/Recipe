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
}

export const recipeRepository = new RecipeRepository();
