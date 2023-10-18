import React from 'react';
import style from './Like.module.css'

const Like: React.FC<any> = ({image}) => {

    const addImageToLocalStorage = (imageUrl: string) => {
        const favorites = localStorage.getItem('favorites')
        if (favorites) {
            const newFavorites = [...JSON.parse(favorites), {urls: {small: imageUrl}}]
            localStorage.setItem('favorites', JSON.stringify(newFavorites))
        } else {
            localStorage.setItem('favorites', JSON.stringify([{urls: {small: imageUrl}}]))
        }
    }

    const removeImageFromLocalStorage = (imageUrl: string) => {
        const favorites = localStorage.getItem('favorites')
        if (favorites) {
            const newFavorites = JSON.parse(favorites).filter((f: any) => f.urls.small !== imageUrl)
            localStorage.setItem('favorites', JSON.stringify(newFavorites))
        }
    }

    const checkIfLiked = (imageUrl: string) => {
        const favorites = localStorage.getItem('favorites')
        if (favorites) {
            return JSON.parse(favorites).filter((f: any) => f?.urls?.small === imageUrl).length ===1
        }
        return false
    }

    const [favorite, setFavorite] = React.useState(checkIfLiked(image));
    const onFavorite = () => {
        if (favorite) {
            removeImageFromLocalStorage(image)
        } else {
            addImageToLocalStorage(image)
        }
        setFavorite(prev => !prev)
    };
    return (
            <img
                className={style.favorite}
                onClick={onFavorite}
                width={25} height={25}
                src={favorite ? "/img/heart_clicked.svg" : "/img/heart_unclicked.svg"}
                alt="Unclicked" />
    );
};

export default Like;