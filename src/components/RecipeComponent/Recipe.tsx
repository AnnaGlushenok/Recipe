'use client';
import style from "./recipe.module.css";
import {useEffect, useState} from "react";
import {RecipeDTO} from "@/app/DAL/RecipeDTOType";
import Image from "next/image";
import Message from "@/components/Message/Message";

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

    if (loading) return <Message message={"Загрузка..."} img={"/images/loading.png"}/>
    if (error) return <Message message={`Ошибка: ${error}`} img={"/images/SadGordon.png"}/>
    if (!recipe) return <Message message={"Рецепт ещё не придумали("} img={"/images/SadGordon.png"}/>

    return (
        <div className={style.container}>
            <h1 className={style.title}>{recipe.name}</h1>
            <div className={style.ingredients_container}>
                <Image loading="lazy" className={style.img} src={`${recipe.imgPath}`} width={340}
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
            <h2 className={style.technology}>Технология</h2>
            <div className={style.technology_container}>
                <ol className={style.list}>
                    {
                        recipe.technology.map((item, index) =>
                            <li key={index}>{item.item}</li>)
                    }
                </ol>
            </div>
            {recipe.notes !== undefined && (
                <div className={style.notes_container}>
                    <h2 className={style.notes_title}>Примечания</h2>
                    <p className={style.notes_note}>{recipe.notes}</p>
                </div>
            )}
        </div>
    )
}