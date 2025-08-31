export type RecipeDTO = {
    id: number,
    category: string,
    name: string,
    imgPath: string,
    ingredients: { name: string; amount: string }[],
    technology: { item: string }[],
    notes?: string
};