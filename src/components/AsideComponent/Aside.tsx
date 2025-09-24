import style from "./aside.module.css"
import cross from "../../../public/images/cross.svg";
import Image from "next/image";

export default function Aside({categories, selected, isOpen, setSelectedCategories, onToggle}: {
    categories: string[];
    selected: string[];
    isOpen: boolean;
    setSelectedCategories: (categories: string[]) => void;
    onToggle: () => void
}) {
    const handleChange = (category: string) => {
        setSelectedCategories(
            selected.includes(category)
                ? selected.filter(c => c !== category)
                : [...selected, category]
        );
    };

    return (
        <aside className={`${style.wrapper} ${isOpen ? style.open : ""}`}>
            <Image src={cross} className={style.button} alt="cross" width={28} height={28} onClick={onToggle}/>
            {
                categories.map(category => (
                    <label key={category} className={style.label}>
                        <input
                            type="checkbox"
                            className={style.input}
                            checked={selected.includes(category)}
                            onChange={() => handleChange(category)}
                        />
                        {category}
                    </label>
                ))
            }
        </aside>
    );
}
