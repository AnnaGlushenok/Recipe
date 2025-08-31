import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";
import {RecipeDTO} from "@/app/DAL/RecipeDTOType";

export default function Card(recipe: RecipeDTO) {
    return (
        <div className={styles.card_container}>
            <Image className={styles.img} width={340} height={200} src={recipe.imgPath} alt={recipe.name}/>
            <h1 className={styles.name}>{recipe.name}</h1>
            <p className={styles.category}>{recipe.category}</p>
            <p className={styles.ingredients}>{recipe.ingredients.map(i => i.name).join(", ")}</p>
            <Link className={styles.button} href={`/recipe/${recipe.id}`}>Готовить</Link>
        </div>
    );
}