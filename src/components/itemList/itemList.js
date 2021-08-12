import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const ItemListBlock = styled.ul`
    .list-group-item {
        cursor: pointer;
    }
`;

function ItemList({getData, onItemSelected, renderItem}) {
    const [itemList, updateList] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        getData()
            .then((data) => {
                updateList(data);
            })
            .catch(onError);
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

    function onError() {
        setError(true);
    }

    if (error) {
        return <ErrorMessage/>;
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
