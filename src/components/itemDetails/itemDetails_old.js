import React, {Component} from 'react';
import styled from 'styled-components';
import ErrorMessage from '../errorMessage';

const ItemDetailsBlock = styled.div`
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

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field};

export default class ItemDetails extends Component {
    state = {
        item: null,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    updateItem() {
        const {itemId, getData} = this.props;

        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({
                    item
                });
            })
            .catch( () => this.onError());
    }

    onError(){
        this.setState({
            item: null,
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        if (!this.state.item) {
            return <SelectErrorBlock>Please select an item</SelectErrorBlock>
        }

        const {item} = this.state;
        const {name} = item;

        return (
            <ItemDetailsBlock className="rounded bg-light">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {React.Children.map(this.props.children, (child) => {
                        return React.cloneElement(child, {item})
                    })}
                </ul>
            </ItemDetailsBlock>
        );
    }
}
