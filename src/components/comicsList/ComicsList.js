import './comicsList.scss';

import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return < Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : < Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error': 
            return <ErrorMessage/>;
        default: 
            throw new Error('Unexpected process state');
    }
}

const ComicsList = () => {

    const [comicList, setComicList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicEnded, setComicEnded] = useState(false);


    const {setProcess, process, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicListLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onComicListLoaded = (newComicList) => {
        let ended = false;
        if (newComicList.length < 8) {
            ended = true;
        }

        setComicList(comicList => [...comicList, ...newComicList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 8);
        setComicEnded(comicEnded => ended);
    }


    function renderItems (arr) {
        const items = arr.map((item, i) => {
            return (
                <motion.li 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ amount: 0.3}}
                    transition={{ ease: "easeOut", duration: 1 }}
                    className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </motion.li>
            )
        })


    return (
            <ul className="comics__grid">
                {items}
            </ul>
    )
}


    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(comicList), newItemLoading)}
            <button 
                disabled={newItemLoading} 
                style={{'display' : comicEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


export default ComicsList;