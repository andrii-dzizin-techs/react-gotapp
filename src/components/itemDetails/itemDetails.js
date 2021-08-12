import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
// import ErrorMessage from '../errorMessage';

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

function ItemDetails({itemId, getData, children}) {
    const [item, setItem] = useState(null);

    useEffect(() => {
        updateItem();
    }, [itemId]);

    function updateItem() {
        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                setItem(item);
            });
    }

    if (!item) {
        return <SelectErrorBlock>Please select an item</SelectErrorBlock>
    }

    const {name} = item;

    return (
        <ItemDetailsBlock className="rounded bg-light">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                {React.Children.map(children, (child) => {
                    return React.cloneElement(child, {item})
                })}
            </ul>
        </ItemDetailsBlock>
    );
}

export default ItemDetails;
