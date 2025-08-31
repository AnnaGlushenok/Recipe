import {NextResponse} from "next/server";
import {recipeService} from "../../DAL/services/recipeService";

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
        const body = await req.json();
        const recipe = await recipeService.create(body);
        return NextResponse.json(recipe);
    } catch (err: unknown) {
        const e = err as PrismaError;
        return NextResponse.json({error: e.message}, {status: 400});
    }
}
