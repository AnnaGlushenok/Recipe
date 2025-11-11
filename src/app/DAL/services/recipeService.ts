import {recipeRepository} from "../repositories/recipeRepository";
import {categoryService} from "./categoryService";
import {imageService} from "./imageService";
import {mapCreateRecipeToRecipe, mapDTOToRecipe, mapRecipesToDTO, mapRecipeToDTO} from "../mappers/recipeMapper";
import {RecipeDTO} from "@/app/DAL/RecipeDTOType";
import {CreateRecipe} from "@/app/DAL/CreateRecipe";

class RecipeService {
    async create(dto: CreateRecipe, file: File) {
        const imagePath = await imageService.create(file);
        let category = await categoryService.getByName(dto.category);
        if (!category)
            category = await categoryService.create(dto.category);
        dto.imgPath = imagePath
        const recipe = await recipeRepository.create(mapCreateRecipeToRecipe(dto, category!.id))
        return mapRecipeToDTO({...recipe, category});
    }

    async getAll() {
        const recipes = await recipeRepository.findAll()
        if (!recipes)
            return null

        return mapRecipesToDTO(recipes.map(recipe => ({
            ...recipe,
            category: {
                id: recipe.category.id,
                name: recipe.category.name
            }
        })))
    }

    async getById(id: number) {
        const recipe = await recipeRepository.findById(id);
        if (!recipe)
            return null;
        const category = await categoryService.getById(recipe.category_id)
        return mapRecipeToDTO({...recipe, category: category!});
    }

    async update(dto: RecipeDTO) {
        const recipe = await recipeRepository.findById(dto.id);
        if (!recipe)
            return null;

        let category = await categoryService.getByName(dto.category);
        if (!category)
            category = await categoryService.create(dto.category);

        return recipeRepository.update(mapDTOToRecipe(dto, category.id));
    }

    async delete(id: number) {
        return recipeRepository.delete(id);
    }
}

export const recipeService = new RecipeService();
