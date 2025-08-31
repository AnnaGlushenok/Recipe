'use client'
import Navbar from "@/components/NavbarComponent/Navbar";
import {useEffect, useState} from "react";
import Card from "@/components/CardComponent/Card";
import style from "./main.module.css";
import {RecipeDTO} from "@/app/DAL/RecipeDTOType";

export default function Main() {
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [recipes, setRecipes] = useState<RecipeDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/recipes")
            .then(res => {
                if (!res.ok)
                    throw new Error("Ошибка при загрузке рецептов");
                return res.json();
            })
            .then((data: RecipeDTO[]) => {
                setRecipes(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const filteredRecipes =
        selectedCategories.length === 0
            ? recipes
            : recipes.filter(r => selectedCategories.includes(r.id));

    if (loading) return <p>Подготовка...</p>;
    if (error) return <div>Ошибка: {error}</div>;
    if (!recipes || recipes.length === 0) return <div>Рецептов нет(</div>;

    return (
        <>
            <header>
                <Navbar selected={selectedCategories} setSelected={setSelectedCategories}/>
            </header>
            <main className={style.container}>
                {filteredRecipes.map(recipe =>
                    <Card key={recipe.id} {...recipe}/>)}
            </main>
            <button onClick={() => console.log(recipes)}>aaaaaa</button>
        </>
    );
}