import Recipe from "@/components/RecipeComponent/Recipe";

export default async function RecipePage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params
    return <Recipe id={+id}/>;
}

export const dynamic = "force-dynamic";
