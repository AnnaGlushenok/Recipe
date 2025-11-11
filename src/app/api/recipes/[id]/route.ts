import {NextResponse} from "next/server";
import {recipeService} from "@/app/DAL/services/recipeService";

interface PrismaError {
    message: string;
    code?: string;
}

export async function GET(_: Request, {params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    try {
        const recipe = await recipeService.getById(+id);
        return NextResponse.json(recipe);
    } catch (err: unknown) {
        const e = err as PrismaError;
        return NextResponse.json({error: e.message}, {status: 404});
    }
}

export async function DELETE(_: Request, {params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    try {
        const recipe = await recipeService.delete(+id);
        return NextResponse.json(recipe);
    } catch (err: unknown) {
        const e = err as PrismaError;
        return NextResponse.json({error: e.message}, {status: 400});
    }
}

export const dynamic = "force-dynamic";