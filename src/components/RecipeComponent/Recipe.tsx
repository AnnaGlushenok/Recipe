'use client';
import style from "./recipe.module.css";
import {useEffect, useState} from "react";
import {RecipeDTO} from "@/app/DAL/RecipeDTOType";
import Image from "next/image";

export default function Recipe({id}: { id: number }) {
    const [recipe, setRecipe] = useState<RecipeDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/api/recipes/${+id}`)
            .then(res => {
                if (!res.ok)
                    throw new Error("Ошибка при загрузке рецептов");
                return res.json();
            })
            .then((data: RecipeDTO) => {
                setRecipe(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <div>Ошибка: {error}</div>;
    if (!recipe) return <p>Рецепт ещё не придумали(</p>;

    return (
        <> <h1 className={style.center}>{recipe.name}</h1>
            <div className={style.container}>
                <Image loading="lazy" className={style.img} src={`/${recipe.imgPath}`} width={340}
                       height={200} alt={recipe.name}/>
                <div className={style.ingredients}>
                    <table className={style.table}>
                        <thead className={style.caption}>
                        <tr>
                            <th colSpan={2}>Ингредиенты</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            recipe.ingredients.map((item, index) => (
                                <tr key={index}>
                                    <td className={style.left_col}> {item.name}</td>
                                    <td className={style.right_col}> {item.amount}</td>
                                </tr>
                            ))
                        }</tbody>
                    </table>
                </div>
            </div>
            <h2 className={style.center}>Технология</h2>
            <div className={style.container}>
                <ol className={style.list}>
                    {
                        recipe.technology.map((item, index) =>
                            <li key={index}>{item.item}</li>
                        )
                    }</ol>
                {
                    recipe.notes ?? <>
                        <h2 className={style.center}>Примечания</h2>
                        <p>{recipe.notes}</p>
                    </>
                }
            </div>
        </>
    )
}