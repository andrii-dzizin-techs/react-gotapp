import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`;

const TermSpan = styled.span`
    font-weight: bold;
`;

function RandomChar({interval = 15000}) {
    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const gotService = new GotService();
    let timerId;

    useEffect(() => {
        updateChar();
        timerId = setInterval(updateChar, interval);
        return () => {
            clearInterval(timerId);
        }
    }, [loading]);

    function onCharLoaded(char) {
        setChar(char);
        setLoading(false);
    }

    function onError() {
        setError(true);
        setLoading(false);
    }

    function updateChar()  {
        const id = Math.floor(Math.random()*140 + 25); // 25-140
        gotService.getCharacter(id)
            .then(onCharLoaded)
            .catch(onError);
    }


    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || errorMessage) ? <View char={char}/> : null;

    return (
        <RandomBlock className="rounded">
            {errorMessage}
            {spinner}
            {content}
        </RandomBlock>
    );
}

export default RandomChar;

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;

    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <TermSpan className="term">Gender </TermSpan>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <TermSpan className="term">Born </TermSpan>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <TermSpan>Died </TermSpan>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <TermSpan>Culture </TermSpan>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}
