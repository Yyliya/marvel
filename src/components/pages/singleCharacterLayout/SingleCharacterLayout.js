import { useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import AppBanner from '../../appBanner/AppBanner';

import './singleCharacterLayout.scss';

const SingleCharacterLayout = () => {
    const {charId} = useParams();
    const [character, setCharacter] = useState(null);
    const {loading, error, getCharacterName, clearError} = useMarvelService();

    useEffect(() => {
        updateCharacter()
    }, [charId])

    const updateCharacter = () => {
        clearError();
        getCharacterName(charId)
            .then(onCharacterLoaded)
    }

    const onCharacterLoaded = (character) => {
        setCharacter(character);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !character) ? <View character={character}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({character}) => {
    const {name, description, thumbnail} = character;

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