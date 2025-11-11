import Image from "next/image";
import style from "./message.module.css";

export default function Message({message, img}: { message: string, img: string }) {
    console.log(img)
    return (<div className={style.center}>
        <Image className={style.img} width={100} height={100} src={img} alt={img}/>
        <p>{message}</p>
    </div>)
}