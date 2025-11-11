import {Category, Recipe} from "@prisma/client";
import {RecipeDTO} from "@/app/DAL/RecipeDTOType";
import {CreateRecipe} from "@/app/DAL/CreateRecipe";

export function mapRecipeToDTO(recipe: Recipe & { category: Category }): RecipeDTO {
    return {
        id: recipe.id,
        name: recipe.name,
        imgPath: recipe.img_path,
        category: recipe.category.name,
        ingredients: recipe.ingredients.split(";")
            .map((i) => {
                const [name, amount] = i.split(":");
                return {name: name.trim(), amount: amount?.trim() ?? ""};
            }),
        technology: recipe.technology.split(";")
            .map((step) => ({item: step.trim()})),
        notes: recipe.notes || undefined
    };
}

export function mapRecipesToDTO(recipes: (Recipe & { category: Category })[]): RecipeDTO[] {
    return recipes.map(mapRecipeToDTO);
}

export function mapCreateRecipeToRecipe(dto: CreateRecipe, categoryId: number) {
    return {
        category_id: categoryId,
        name: dto.name,
        img_path: dto.imgPath,
        ingredients: dto.ingredients.map((i) => `${i.name}:${i.amount}`).join(";"),
        technology: dto.technology.map((t) => t.item).join(";"),
        notes: dto.notes ?? null,
    };
}

export function mapDTOToRecipe(dto: RecipeDTO, categoryId: number) {
    return {
        id: dto.id,
        ...mapCreateRecipeToRecipe(dto, categoryId),
    };
}