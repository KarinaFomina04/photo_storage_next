"use client"
import React from "react";
import style from './PhotoPage.module.css'
import Collection from '@/components/Collection/Collection';
import CustomSelect from "@/components/CustomSelect/CustomSelect";

const topics = [
    { id: 'All', name: 'All' },
    { id: 'CDwuwXJAbEw', name: '3D Renders' },
    { id: 'Jpg6Kidl-Hk', name: 'Animals' },
    { id: 'M8jVbLbTRws', name: 'Architecture & Interiors' },
    { id: 'qPYsDzvJOYc', name: 'Experimental' },
    { id: 'S4MKLAsBB74', name: 'Fashion & Beauty' },
    { id: 'hmenvQhUmxM', name: 'Film' },
    { id: 'Favorites', name: 'Favorites ❤️'}
];


const PhotoPage: React.FC = () => {
    const [categoryId, setCategoryId] = React.useState('All');
    const [isLouding, setIsLouding] = React.useState(true);
    const [page, setPage] = React.useState(1);
    const [collections, setCollections] = React.useState([]);
    const [selectedOption, setSelectedOption] = React.useState('featured')

    React.useEffect(() => {

        const category = categoryId !== 'All' ? `topics/${categoryId}/` : '';
        if (categoryId !== 'Favorites') {
            setIsLouding(true);
            fetch(`https://api.unsplash.com/${category}photos?page=${page}&order_by=${selectedOption}&client_id=${process.env.NEXT_PUBLIC_UNSPLASHING_CLIENT_SECRET}`)
            // fetch('test')
                .then((res) => res.json())
                .then((json) => {
                    setCollections(json)
                })
                .catch(err => {
                    console.warn(err);
                    console.log('Error while getting data.');
                })
                .finally(() => setIsLouding(false));
        } else {
            const favorites = localStorage.getItem('favorites')
            if (favorites) {
                setCollections(JSON.parse(favorites))
            } else {
                setCollections([])
            }
        }

    }, [categoryId, page, selectedOption]);

    return (
        <div className={style.App}>
            <h1 className={style.myPhotos}>My photos</h1>
            <div className={style.top}>
                <ul className={style.tags}>
                    {topics.map((obj, i) => (
                        <li
                            onClick={() => {
                                setCategoryId(obj.id)
                            }}
                            className={categoryId == obj.id ? style.active : ''}
                            key={obj.name}>{obj.name}
                        </li>
                    ))}
                </ul>
                {/*<input*/}
                {/*    value={searchValue}*/}
                {/*    onChange={e => setSearchValue(e.target.value)}*/}
                {/*    className={style.search_input}*/}
                {/*    placeholder="Search by title" />*/}
                <CustomSelect options={['featured', 'latest']} value={selectedOption} onChange={setSelectedOption} />
            </div>
            <div className={style.content}>
                {isLouding ? (
                    <h2>Data is louding ...</h2>
                ) : (
                    collections.length > 0 ? collections.map((obj: any) => (
                            <Collection key={obj?.urls?.small} image={obj?.urls?.small} />)) : <h2>No data</h2>
                )}

            </div>
            {categoryId !== 'Favorites' && <ul className={style.pagination}>
                {[...Array(5)].map((_, i) => (
                    <li key={i} onClick={() => setPage(i + 1)}
                        className={page == i + 1 ? style.active : ''}>{i + 1}</li>
                ))}
            </ul>}
        </div>
    );
}

export default PhotoPage;