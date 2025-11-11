import {NextResponse} from "next/server";
import {recipeService} from "../../DAL/services/recipeService";
import {CreateRecipe} from "@/app/DAL/CreateRecipe";

interface PrismaError {
    message: string;
    code?: string;
}

export async function GET() {
    const recipes = await recipeService.getAll();
    return NextResponse.json(recipes);
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file || file.size === 0)
            return NextResponse.json({error: "No valid file uploaded"}, {status: 400});

        const recipe1: CreateRecipe = {
            name: formData.get("name") as string,
            category: formData.get("category") as string,
            imgPath: "images/image.svg",
            ingredients: JSON.parse(formData.get("ingredients") as string),
            technology: JSON.parse(formData.get("technology") as string),
            notes: formData.get("notes") as string
        }
        const recipe = await recipeService.create(recipe1, file);
        return NextResponse.json(recipe);
    } catch (err: unknown) {
        const e = err as PrismaError;
        return NextResponse.json({error: e.message}, {status: 400});
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const recipe = await recipeService.update(body);
        return NextResponse.json(recipe);
    } catch (err: unknown) {
        const e = err as PrismaError;
        return NextResponse.json({error: e.message}, {status: 400});
    }
}

export const dynamic = "force-dynamic";