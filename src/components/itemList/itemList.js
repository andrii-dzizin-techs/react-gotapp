import React, {Component} from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';
import GotService from '../../services/gotService';

const ItemListBlock = styled.ul`
    .list-group-item {
        cursor: pointer;
    }
`;

const ItemList = ({data, renderItem, onItemSelected}) => {
    const renderItems = (arr) => {
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

    // render() {
        // const {data} = this.props;
        const items = renderItems(data);

        return (
            <ItemListBlock className="list-group">
                {items}
            </ItemListBlock>
        );
    // }
}

ItemList.defaultProps = {
    onItemSelected: () => {}
}
ItemList.propTypes = {
    onItemSelected: PropTypes.func
}

const withData = (View, getData) => {
    return class extends Component {
        state = {
            data: null,
            error: false
        }
    
        componentDidMount() {    
            getData()
                .then((data) => {
                    this.setState({
                        data
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
                data: null,
                error: true
            })
        }

        render() {
            if (this.state.error) {
                return <ErrorMessage/>
            }
    
            const {data} = this.state;
    
            if (!data) {
                return <Spinner/>
            }

            return <View {...this.props} data={data} />
        }
    }
}

const {getAllCharacters} = new GotService();
export default withData(ItemList, getAllCharacters);
