import { useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../../services/MarvelService';
import setContent from '../../../utils/setContent';
import AppBanner from '../../appBanner/AppBanner';

import './singleCharacterLayout.scss';

const SingleCharacterLayout = () => {
    const {charId} = useParams();
    const [char, setChar] = useState(null);
    const {getCharacterName, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateCharacter()
    }, [charId])

    const updateCharacter = () => {
        clearError();
        getCharacterName(charId)
            .then(onCharacterLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharacterLoaded = (char) => {
        setChar(char);
    }

    return (
        <>
            <AppBanner/>
            {setContent(process, View, char)}
        </>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail} = data;

    return (
        <div className="single-comic">
        <img src={thumbnail} alt={name} className="single-comic__char-img"/>
        <div className="single-comic__info">
            <h2 className="single-comic__name">{name}</h2>
            <p className="single-comic__descr">{description}</p>
        </div>
    </div>
    )
}

export default SingleCharacterLayout;