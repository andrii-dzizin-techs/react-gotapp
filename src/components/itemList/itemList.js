import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';

const ItemListBlock = styled.ul`
    .list-group-item {
        cursor: pointer;
    }
`;

function ItemList({getData, onItemSelected, renderItem}) {
    const [itemList, updateList] = useState([]);

    useEffect(() => {
        getData()
            .then((data) => {
                updateList(data);
            })
    }, []);

    function renderItems(arr) {
        return arr.map((item, i) => {
            const {id} = item;
            const label = renderItem(item);

            return (
                <li 
                    key={i + id} 
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}
                >
                    {label}
                </li>
            )
        });
    }

    if (!itemList) {
        return <Spinner/>
    }

    const items = renderItems(itemList);

    return (
        <ItemListBlock className="list-group">
            {items}
        </ItemListBlock>
    );
}

export default ItemList;
