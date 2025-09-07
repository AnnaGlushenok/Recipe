import Recipe from "@/components/RecipeComponent/Recipe";

export default async function RecipePage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params
    return (
        <div>
            <Recipe id={+id}/>
        </div>
    );
}
