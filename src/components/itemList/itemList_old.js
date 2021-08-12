import React, {Component} from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const ItemListBlock = styled.ul`
    .list-group-item {
        cursor: pointer;
    }
`;

export default class ItemList extends Component {
    state = {
        itemList: null,
        error: false
    }

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then((itemList) => {
                this.setState({
                    itemList
                })
            })
            .catch( () => this.onError());
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    onError(){
        this.setState({
            itemList: null,
            error: true
        })
    }

    renderItems(arr) {
        return arr.map((item, i) => {
            const {id} = item;
            const label = this.props.renderItem(item);

            return (
                <li 
                    key={i + id} 
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}
                >
                    {label}
                </li>
            )
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const {itemList} = this.state;

        if (!itemList) {
            return <Spinner/>
        }

        const items = this.renderItems(itemList);

        return (
            <ItemListBlock className="list-group">
                {items}
            </ItemListBlock>
        );
    }
}