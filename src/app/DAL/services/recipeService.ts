import {recipeRepository} from "../repositories/recipeRepository";
import {categoryService} from "./categoryService";
import {mapDTOToRecipe, mapRecipesToDTO, mapRecipeToDTO} from "../mappers/recipeMapper";
import {RecipeDTO} from "@/app/DAL/RecipeDTOType";

class RecipeService {
    async create(dto: RecipeDTO) {
        let category = await categoryService.getByName(dto.category);
        if (!category)
            category = await categoryService.create(dto.category);
        const recipe = await recipeRepository.create(mapDTOToRecipe(dto, category!.id))
        return mapRecipeToDTO({...recipe, category});
    }

    async getAll() {
        const recipes = await recipeRepository.findAll()
        if (!recipes) {
            console.log("Servise" + recipes)
            return null
        }

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
}

export const recipeService = new RecipeService();
