import React, {Component} from 'react';
import styled from 'styled-components';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const ItemListBlock = styled.ul`
    .list-group-item {
        cursor: pointer;
    }
`;

export default class ItemList extends Component {
    gotService = new GotService()
    state = {
        charList: null,
        error: false
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList
                })
            })
            .catch( () => this.onError());

        // this.foo.bar = 0;
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    onError(){
        this.setState({
            char: null,
            error: true
        })
    }

    renderItems(arr) {
        return arr.map((item, i) => {
            return (
                <li 
                    key={i + item.charId} 
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(item.charId)}
                >
                    {item.name}
                </li>
            )
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const {charList} = this.state;

        if (!charList) {
            return <Spinner/>
        }

        const items = this.renderItems(charList);

        return (
            <ItemListBlock className="list-group">
                {items}
            </ItemListBlock>
        );
    }
}