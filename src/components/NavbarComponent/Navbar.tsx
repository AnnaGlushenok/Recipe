import style from "./style.module.css"
import Image from "next/image";
import logo from "../../../public/images/logo.svg";

type NavProps = {
    selected: number[];
    setSelected: (categories: number[]) => void;
};

export default function Navbar({selected, setSelected}: NavProps) {

    const handleChange = (category: number) => {
        setSelected(
            selected.includes(category)
                ? selected.filter((c) => c !== category)
                : [...selected, category]
        );
    };

    return (
        <nav className={style.wrapper}>
            <div className={style.container}>
                <Image src={logo} alt={"logo"} width={70} height={70}/>
                <div className={style.items}>
                    {/*{*/}
                    {/*    categories.map(category => (*/}
                    {/*        <label key={category.id} className={style.label}>*/}
                    {/*            <input*/}
                    {/*                type="checkbox"*/}
                    {/*                className={style.input}*/}
                    {/*                onChange={() => handleChange(category.id)}*/}
                    {/*                checked={selected.includes(category.id)}*/}
                    {/*            />*/}
                    {/*            {category.name}*/}
                    {/*        </label>*/}
                    {/*    ))*/}
                    {/*}*/}
                </div>
            </div>
        </nav>
    );
}
