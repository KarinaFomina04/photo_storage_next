import React from "react";
import style from './Collection.module.css'
import Like from "@/components/Like/Like";

const Collection: React.FC<any> = ({image}) => {

    return (
        <div className={style.collection}>
            <img className={style.collection__big} src={image} alt="Item" />
            <Like image={image}/>
        </div>
    )
}

export default Collection;