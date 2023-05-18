import './randomChar.scss';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import mjolnir from '../../resources/img/mjolnir.png';
import { useEffect, useState } from 'react';
import { motion} from 'framer-motion';

const RandomChar = () => {

    const [char, setChar] = useState(null);
    const {process, setProcess, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 60000);

        return () => {
            clearInterval(timerId)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const blokAnimation = {
        hidden: {
            y: -100,
            opasity: 0
        },
        visible: custom => ({
            y: 0,
            opasity: 1,
            delay: 1,
            transition: {delay: custom * 0.2},
        }),
    }

    return (
        <motion.div
        initial="hidden"
        whileInView="visible"
        variants={blokAnimation}
        custom={2}
        viewport={{ once: true }}
            className="randomchar">
                {setContent(process, View, char)}
            <motion.div
            variants={blokAnimation}
            custom={4}
            className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner" >try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </motion.div>
        </motion.div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki} = data;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                    {description}
                    </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )

}

export default RandomChar;