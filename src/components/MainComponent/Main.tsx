'use client'
import {useEffect, useState} from "react";
import Card from "@/components/CardComponent/Card";
import style from "./main.module.css";
import {RecipeDTO} from "@/app/DAL/RecipeDTOType";
import Aside from "@/components/AsideComponent/Aside";
import Navbar from "@/components/NavbarComponent/Navbar";

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

    if (loading) return <p>Подготовка...</p>;
    if (error) return <div>Ошибка: {error}</div>;
    if (!recipes || recipes.length === 0) return <div>Рецептов нет(</div>;

    return (
        <>
            <header>
                <Navbar showAside={() => setIsOpen(!isOpen)}/>
            </header>
            <div className={style.wrap}>
                {/*<Aside isOpen={isOpen} onToggle={toggleMenu} categories={categories} selected={selectedCategories}*/}
                {/*       setSelectedCategories={setSelectedCategories}/>*/}
                <main className={style.container}>
                    {filteredRecipes.map(recipe =>
                        <Card key={recipe.id} {...recipe}/>)}
                    {filteredRecipes.map(recipe =>
                        <Card key={recipe.id} {...recipe}/>)}
                    {filteredRecipes.map(recipe =>
                        <Card key={recipe.id} {...recipe}/>)}
                    {filteredRecipes.map(recipe =>
                        <Card key={recipe.id} {...recipe}/>)}
                </main>
                <Aside isOpen={isOpen} onToggle={toggleMenu} categories={categories} selected={selectedCategories}
                       setSelectedCategories={setSelectedCategories}/>
            </div>
        </>
    );
}