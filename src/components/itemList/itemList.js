import React, {Component} from 'react';
import styled from 'styled-components';
import GotService from '../../services/gotService';
import Spinner from '../spinner';

const ItemListBlock = styled.ul`
    .list-group-item {
        cursor: pointer;
    }
`;

export default class ItemList extends Component {
    gotService = new GotService()
    state = {
        charList: null
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList
                })
            })
    }

    renderItems(arr) {
        return arr.map((item, i) => {
            return (
                <li 
                    key={i} 
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(41 + i)}
                >
                    {item.name}
                </li>
            )
        });
    }

    render() {
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