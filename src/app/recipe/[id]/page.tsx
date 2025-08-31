'use client';
import Image from "next/image";
import style from "./style.module.css"
import logo from "../../../../public/images/logo.svg";
import Link from "next/link";
import Recipe from "@/components/RecipeComponent/Recipe";

export default function RecipePage({params}: { params: Promise<{ id: string }> }) {
    return (
        <div>
            <header>
                <nav className={style.wrapper}>
                    <div className={style.nav_container}>
                        <Link href={`/`}>
                            <Image src={logo} alt={"logo"} width={70} height={70}/>
                        </Link>
                    </div>
                </nav>
            </header>
            <Recipe id={Number(params.id)}/>
        </div>
    );
}
