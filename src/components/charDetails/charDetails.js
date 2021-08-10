import React, {Component} from 'react';
import styled from 'styled-components';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const CharDetailsBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`;

const SelectErrorBlock = styled.span`
    color: #fff;
    text-align: center;
    font-size: 26px;
`;

export default class CharDetails extends Component {
    gotService = new GotService()
    state = {
        char: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    updateChar() {
        const {charId} = this.props;

        // this.foo.bar = 0;

        if (!charId) {
            return;
        }

        this.gotService.getCharacter(charId)
            .then((char) => {
                this.setState({
                    char,
                    loading: false
                });
            })
            .catch( () => this.onError());
    }

    onError(){
        this.setState({
            char: null,
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        if (!this.state.char) {
            return <SelectErrorBlock>Please select a character</SelectErrorBlock>
        }

        const {char, loading} = this.state;
        const content = !loading ? <View char={char}/> : <Spinner/>;

        return (
            <CharDetailsBlock className="rounded">
                {content}
            </CharDetailsBlock>
        );
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;

    return (
        <>
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender</span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born</span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died</span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture</span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}
