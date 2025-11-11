'use client'
import {useEffect, useState} from "react";
import Card from "@/components/CardComponent/Card";
import style from "./main.module.css";
import {RecipeDTO} from "@/app/DAL/RecipeDTOType";
import Aside from "@/components/AsideComponent/Aside";
import Navbar from "@/components/NavbarComponent/Navbar";
import Message from "@/components/Message/Message";

export default function Main() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [recipes, setRecipes] = useState<RecipeDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const toggleMenu = () => setIsOpen(prev => !prev);

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

    const categories = [...new Set(recipes.map(recipe => recipe.category))]
    const filteredRecipes =
        selectedCategories.length === 0
            ? recipes
            : recipes.filter(r => selectedCategories.includes(r.category));

    if (loading) return <Message message={"Подготовка..."} img={"/images/loading.png"}/>
    if (error) return <Message message={`Ошибка: ${error}`} img={"/images/SadGordon.png"}/>
    if (!recipes || recipes.length === 0) return <Message message={"Рецептов нет("} img={"/images/SadGordon.png"}/>

    return (
        <>
            <header>
                <Navbar showAside={() => setIsOpen(!isOpen)}/>
            </header>
            <div className={style.wrap}>
                <main className={style.container}>
                    {filteredRecipes.map(recipe =>
                        <Card key={recipe.id} {...recipe}/>)}
                </main>
                <Aside isOpen={isOpen} onToggle={toggleMenu} categories={categories} selected={selectedCategories}
                       setSelectedCategories={setSelectedCategories}/>
            </div>
        </>
    );
}