import style from "./navbar.module.css"
import Image from "next/image";
import logo from "../../../public/images/logo.svg";
import menu from "../../../public/images/menu.svg";
import Link from "next/link";

export default function Navbar({showAside}: { showAside: () => void }) {
    return (
        <nav className={style.wrapper}>
            <div className={style.container}>
                <Link href={`/`}>
                    <Image src={logo} alt={"logo"} width={70} height={70}/>
                </Link>
                <Image src={menu} className={style.menu} alt="menu" width={28} height={28} onClick={showAside}/>
            </div>
        </nav>
    );
}
